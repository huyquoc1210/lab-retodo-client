import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Form from 'components/Form/Form';
import FormCheckbox from 'components/Form/FormCheckBox';
import FromSpacing from 'components/Form/FormSpacing';
import FormTextField from 'components/Form/FormTextField';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Todo } from 'types/todo';
import Validator from 'utils/Validator';
import type { ObjectSchema } from 'yup';

interface FormValues {
  title: string;
  description: string | null;
  isCompleted: boolean;
}

const schema: ObjectSchema<FormValues> = Validator.shape({
  title: Validator.string().required(),
  description: Validator.string().optional(),
  isCompleted: Validator.boolean().default(false).required(),
});

interface DetailTodoProps {
  open: boolean;
  onClose: VoidFunction;
  onEdit: (todo: Todo) => VoidFunction;
  todo?: Todo | null;
}

interface DetailTodoProps {}

const DetailTodo = (props: DetailTodoProps) => {
  const { open, onClose, onEdit, todo } = props;

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const handleReset = () => {
    onClose();
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

  const handleEditTodo = () => {
    if (!todo) return;
    handleReset();
    onEdit(todo)();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        component: Form,
        form: form,
        onSubmit: async () => {},
      }}
    >
      <DialogTitle>Create Todo</DialogTitle>
      <Box sx={{ p: 2.5 }}>
        <FromSpacing>
          <FormTextField name="title" required label="Title" disabled />
          <FormTextField
            name="description"
            label="Description"
            multiline
            rows={3}
            disabled
          />
          <FormCheckbox name="isCompleted" label="Is completed" disabled />
        </FromSpacing>
      </Box>
      <DialogActions>
        <Button onClick={handleReset} startIcon={<CloseIcon />}>
          Close
        </Button>
        <Button startIcon={<EditIcon />} onClick={handleEditTodo}>
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailTodo;
