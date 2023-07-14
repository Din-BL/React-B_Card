import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TableProps, UserCard } from '../utils/types';
import { deleteUser } from '../utils/services';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { logout, status } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { LoginInfoContext } from '../context/LoginInfo';
import { remove } from '../utils/sweetalert';
import EditIcon from '@mui/icons-material/Edit';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function UserTable({ Users, userDeletion }: TableProps) {
    const navigate = useNavigate()
    const { setLoginInfo } = React.useContext(LoginInfoContext)

    function removeUser(id: string) {
        remove().then((result) => {
            if (result.isConfirmed) {
                deleteUser(id)
                    .then(() => {
                        toast.success(`User been removed`)
                        userDeletion(id)
                    })
                    .catch(e => {
                        const errMsg = e.response.data
                        toast.warning(errMsg)
                        errMsg.includes('expired') && logout(navigate, setLoginInfo)
                    })
            }
        })
    }

    return (
        <Box paddingBottom={3}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No.</StyledTableCell>
                            <StyledTableCell>User name</StyledTableCell>
                            <StyledTableCell>Email address</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Users.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    <Box display={'flex'} justifyContent={'space-between'}>
                                        <Typography fontSize={15} variant="button">
                                            {index + 1}
                                        </Typography>
                                        {status(row) !== 'Admin' &&
                                            <Box>
                                                <EditIcon />
                                                <DeleteIcon sx={{ marginLeft: 1 }} onClick={() => { removeUser(row._id as string) }} />
                                            </Box>}
                                    </Box>
                                </StyledTableCell>
                                <StyledTableCell>{row.userName}</StyledTableCell>
                                <StyledTableCell>{row.email}</StyledTableCell>
                                <StyledTableCell>{status(row)}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
