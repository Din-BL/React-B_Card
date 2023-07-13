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
import { UserCard } from '../utils/types';
import { deleteUser } from '../utils/services';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { logout } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { LoginInfoContext } from '../context/LoginInfo';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface TableProps {
    Users: UserCard[]
    userDeletion: (id: string) => void
}

function status(status: UserCard) {
    if (status.admin) {
        return 'Admin'
    } else if (status.business)
        return "Business"
    else {
        return 'User'
    }
}


export default function UserTable({ Users, userDeletion }: TableProps) {
    const navigate = useNavigate()
    const { setLoginInfo } = React.useContext(LoginInfoContext)


    function removeUser(id: string) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
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
                                        {<DeleteIcon onClick={() => { removeUser(row._id as string) }} />}
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
