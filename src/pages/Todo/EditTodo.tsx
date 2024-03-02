import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert, { type AlertProps } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Form from 'components/Form/Form';
import FormCheckBox from 'components/Form/FormCheckBox';
import FromSpacing from 'components/Form/FormSpacing';
import FormTextField from 'components/Form/FormTextField';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateTodo } from 'services/todo';
import type { Todo } from 'types/todo';
import Validator from 'utils/Validator';
import type { ObjectSchema } from 'yup';

interface FormValues {
  description: string | null;
  title: string;
  isCompleted: boolean;
}

const schema: ObjectSchema<FormValues> = Validator.shape({
  title: Validator.string().required(),
  description: Validator.string().optional(),
  isCompleted: Validator.boolean().default(false).required(),
});

interface EditTodoProps {
  open: boolean;
  onClose: VoidFunction;
  onRefresh?: VoidFunction;
  todo?: Todo | null;
}

const EditTodo = (props: EditTodoProps) => {
  const { open, onClose, onRefresh, todo } = props;

  const [loading, setLoading] = useState<boolean>(false);
  //Notification state
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<AlertProps['severity']>('success');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const handleOpenSnackbar = (
    message: string,
    severity?: AlertProps['severity'],
  ) => {
    setMessage(message);
    setSeverity(severity || 'success');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
    setMessage(null);
  };

  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const handleReset = () => {
    form.reset(schema.getDefault());
  };

  useEffect(() => {
    if (!todo) return;
    form.reset({
      title: todo.title || '',
      description: todo.description || '',
      isCompleted: todo.isCompleted || false,
    });
  }, [form, todo]);

  const handleSubmit = async (values: FormValues) => {
    if (!todo) return;

    try {
      setLoading(true);
      await updateTodo({
        id: todo.id,
        payload: values,
      });
      onRefresh?.();

      onClose();
      handleOpenSnackbar('Todo was successfully Edit');
    } catch (error) {
      console.log(error);
      handleOpenSnackbar(
        'Todo could not be deleted, please try again later',
        'error',
      );
    } finally {
      setLoading(false);

      handleReset();
    }
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          component: Form,
          form: form,
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Create Todo</DialogTitle>
        <Box sx={{ p: 2.5 }}>
          <FromSpacing>
            <FormTextField name="title" required label="Title" autoFocus />
            <FormTextField
              name="description"
              required
              label="Description"
              multiline
              rows={3}
            />
          </FromSpacing>
          <FormCheckBox name="isCompleted" label="Is Completed" />
        </Box>
        <DialogActions>
          <Button onClick={onClose} startIcon={<CloseIcon />}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default EditTodo;
