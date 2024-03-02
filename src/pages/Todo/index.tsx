import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeIcon from '@mui/icons-material/Home';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { type AlertProps } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PageBreadcrumbs from 'components/Page/PageBreadcrumbs2';
import PageWrapper from 'components/Page/PageWrapper';
import useRefresh from 'hooks/useRefesh';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getTodos } from 'services/todo';
import type { Todo } from 'types/todo';
import CreateTodo from './CreateTodo';
import DeleteTodo from './DeleteTodo';
import EditTodo from './EditTodo';
import DetailTodo from './DetailTodo';

const Index = () => {
  const { t } = useTranslation();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, refetch] = useRefresh();
  const [open, setOpen] = useState<boolean>(false);

  //Notification state
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<AlertProps['severity']>('success');

  // dialog state
  const [openCreateTodo, setOpenCreateTodo] = useState<boolean>(false);
  const [openEditTodo, setOpenEditTodo] = useState<boolean>(false);
  const [openDeleteTodo, setOpenDeleteTodo] = useState<boolean>(false);
  const [openDetailTodo, setOpenDetailTodo] = useState<boolean>(false);

  // The Selected Todo
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then((response) => {
        const { data } = response;
        setTodos(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refresh]);

  // const handleDelete = (todo: Todo) => async () => {
  //   try {
  //     await deleteTodo(todo.id);
  //     handleOpenSnackbar('Todo was successfully delete');
  //     refetch();
  //     console.log('Deleted');
  //   } catch (error) {
  //     console.log(error);
  //     handleOpenSnackbar('Todo could not be deleted, please try again later');
  //   }
  // };
  //create
  const handleOpenCreateTodo = () => {
    setOpenCreateTodo(true);
  };

  const handleCloseCreateTodo = () => {
    setOpenCreateTodo(false);
  };

  //update
  const handleEditTodo = (todo: Todo) => () => {
    setTodo(todo);
    setOpenEditTodo(true);
  };

  const handleCloseEditTodo = () => {
    setOpenEditTodo(false);
    setTodo(null);
  };

  //Detail
  const handleDetailTodo = (todo: Todo) => () => {
    setTodo(todo);
    setOpenDetailTodo(true);
  };

  const handleCloseDetailTodo = () => {
    setOpenDetailTodo(false);
    setTodo(null);
  };

  //Deelte
  const handleDeleteTodo = (todo: Todo) => () => {
    setTodo(todo);
    setOpenDeleteTodo(true);
  };

  const handleCloseDeleteTodo = () => {
    setOpenDeleteTodo(false);
    setTodo(null);
  };

  return (
    <PageWrapper title={t('Todo')}>
      <PageBreadcrumbs
        page={t('Todo')}
        items={[
          {
            title: t('Home'),
            href: '/',
            icon: HomeIcon,
          },
        ]}
        icon={FormatListBulletedIcon}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Paper sx={{ display: 'flex', justifyContent: 'flex-end', p: 2.5 }}>
          <Button startIcon={<AddIcon />} onClick={handleOpenCreateTodo}>
            Create Todo
          </Button>
        </Paper>
        {loading && <Box>Loading...</Box>}
        <Paper>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell component="th" scope="row">
                      {todo.title}
                    </TableCell>
                    <TableCell>{todo.description}</TableCell>
                    <TableCell>
                      <Chip
                        label={todo.isCompleted ? 'Completed' : 'In Progress'}
                        color={todo.isCompleted ? 'success' : 'error'}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack>
                        <IconButton onClick={handleDetailTodo(todo)}>
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton onClick={handleEditTodo(todo)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={handleDeleteTodo(todo)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <CreateTodo
          open={openCreateTodo}
          onClose={handleCloseCreateTodo}
          onRefresh={refetch}
        />

        <EditTodo
          open={openEditTodo}
          onClose={handleCloseEditTodo}
          onRefresh={refetch}
          todo={todo}
        />

        <DetailTodo
          open={openDetailTodo}
          onClose={handleCloseDetailTodo}
          onEdit={handleEditTodo}
          todo={todo}
        />
        <DeleteTodo
          open={openDeleteTodo}
          onClose={handleCloseDeleteTodo}
          onRefresh={refetch}
          todo={todo}
        />
      </Box>
    </PageWrapper>
  );
};

export default Index;
