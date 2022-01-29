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
} from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { User } from '../../api';
import { Route } from '../../routes';
import { State } from '../../state';
import Modal  from '../Modal';

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
        <Box>
            <Grid container spacing={12}>
                <Grid item xs={6}>
                    <Typography variant="h2">User</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button component={Link} to={Route.ADD_USER}>Add new</Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
            <MuiTable sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell sortDirection={sorted ? order : false} align="right" onClick={toggleSort}>Username</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">City</TableCell>
                    <TableCell align="right">Edit</TableCell>
                    <TableCell align="right">Delete</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {usersList.list.slice().sort(sortCallback).map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.address.city}</TableCell>
                    <TableCell align="right"><Button component={Link} to={`${Route.EDIT_USER}/${row.id}`}>edit</Button></TableCell>
                    <TableCell align="right"><Button onClick={() => handleOpenModal(row.id)}>delete</Button></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </MuiTable>
            </TableContainer>
        </Box>
        <Modal open={isModalOpen} onClose={handleCloseModal} id={selectedUser!} />
    </>
  );
}
