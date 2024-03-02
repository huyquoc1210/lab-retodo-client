import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert, { type AlertProps } from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import { Fragment, useState } from 'react';
import { deleteTodo } from 'services/todo';
import type { Todo } from 'types/todo';

interface DeleteTodoProps {
  open: boolean;
  onClose: VoidFunction;
  onRefresh?: VoidFunction;
  todo?: Todo | null;
}

const DeleteTodo = (props: DeleteTodoProps) => {
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

  const handleSubmit = async () => {
    if (!todo) return;

    try {
      setLoading(true);
      await deleteTodo(todo.id);
      onRefresh?.();

      onClose();
      handleOpenSnackbar('Todo was successfully deleted');
    } catch (error) {
      console.log(error);
      handleOpenSnackbar(
        'Todo could not be deleted, please try again later',
        'error',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{todo?.title}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} startIcon={<CloseIcon />}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            loading={loading}
            color="error"
            loadingPosition="start"
            onClick={handleSubmit}
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

export default DeleteTodo;
