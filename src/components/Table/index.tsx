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
import { Route } from '../../routes';
import { State } from '../../state';
import Modal  from '../Modal';


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
                    <TableCell align="right">Username</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">City</TableCell>
                    <TableCell align="right">Edit</TableCell>
                    <TableCell align="right">Delete</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {usersList.list.map((row) => (
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
