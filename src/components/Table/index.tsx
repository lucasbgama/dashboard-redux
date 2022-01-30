import { 
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    Grid,
    TableSortLabel,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { User } from '../../api';
import { Route } from '../../routes';
import { State } from '../../state';
import Modal  from '../Modal';
import NoUsers from '../NoUsers';

type Order = "asc" | "desc";

export default function Table() {
  const usersList = useSelector((state: State) => state.users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | undefined>(undefined);

  const handleCloseModal = useCallback(() => {
      setIsModalOpen(false);
  }, []);
  const handleOpenModal = useCallback((id: number) => {
      setSelectedUser(id);
      setIsModalOpen(true);
  }, []);
  const [sorted, setSorted] = useState(false);
  const [order, setOrder] = useState<Order>("desc");

  const toggleSort = useCallback(() => {
      setSorted(true);
      setOrder((prevState) => prevState === 'asc' ? 'desc' : 'asc');
  }, [])

  const sortCallback = useCallback((a: User, b: User) => {
      if (!sorted) return 0;
      if (order === 'asc') {
          return a.username.localeCompare(b.username);
      }
      return b.username.localeCompare(a.username);
  }, [sorted, order])

  return (
    <>
        <Paper elevation={1} sx={{ width: '80%', margin: '0 auto', height: '100vh' }}>
            <Grid container justifyContent="space-between" sx={{ width: '90%', margin: '30px auto' }}>
                <Grid item>
                    <Typography variant="h4">User list</Typography>
                </Grid>
                <Grid item>
                    <Button component={Link} to={Route.ADD_USER} variant="contained" sx={{ padding: '5px 40px', textTransform: 'none' }}>Add new</Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper} elevation={2} sx={{ width: '90%', margin: '30px auto' }}>
            {usersList.list.length === 0 ? <NoUsers /> : (
                <MuiTable size="small" aria-label="a dense table">
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow >
                            <TableCell sx={{ padding: '25px' }}>Id</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell sortDirection={sorted ? order : false} align="center" onClick={toggleSort}>
                                <TableSortLabel active={sorted} direction={order}>Username</TableSortLabel></TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">City</TableCell>
                            <TableCell align="center">Edit</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {usersList.list.slice().sort(sortCallback).map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row" sx={{ padding: '25px' }}>
                            {row.id}
                        </TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.username}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.address.city}</TableCell>
                        <TableCell align="center"><Button sx={{ textTransform: 'none', color: 'white', width: '80px' }} color="warning" variant="contained" component={Link} to={`${Route.EDIT_USER}/${row.id}`}>edit</Button></TableCell>
                        <TableCell align="center"><Button sx={{ textTransform: 'none', width: '80px' }} color="error" variant="contained" onClick={() => handleOpenModal(row.id)}>delete</Button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </MuiTable>
            )}
            </TableContainer>
        </Paper>
        <Modal open={isModalOpen} onClose={handleCloseModal} id={selectedUser!} />
    </>
  );
}
