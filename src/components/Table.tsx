import * as React from 'react';
import { styled } from '@mui/material/styles';
import { TableBody, TableContainer, TableHead, TableRow, Box, Typography, Paper, TableCell, tableCellClasses } from '@mui/material';
import UserTable from '@mui/material/Table';
import { Delete, Edit } from '@mui/icons-material';
import { TableProps, UserCard, UserStatus } from '../utils/types';
import { deleteUser } from '../utils/services';
import { toast } from 'react-toastify';
import { logout, status } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { LoginInfoContext } from '../context/LoginInfo';
import { remove } from '../utils/sweetalert';
import Select from './Select';


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

export default function Table({ Users, userDeletion }: TableProps) {
    const navigate = useNavigate()
    const { setLoginInfo } = React.useContext(LoginInfoContext)

    function userStatus(status: UserStatus, id: string) {
        return status !== 'Admin' ? <Select userStatus={status} userId={id} /> : status
    }

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

    function sortUser(users: UserCard[]) {
        return users.sort((a, b) => {
            if (a.admin === b.admin) {
                return 0;
            } else if (a.admin) {
                return -1;
            } else {
                return 1;
            }
        })
    }

    return (
        <Box paddingBottom={3}>
            <TableContainer component={Paper}>
                <UserTable sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No.</StyledTableCell>
                            <StyledTableCell>User name</StyledTableCell>
                            <StyledTableCell>Email address</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortUser(Users).map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    <Box display={'flex'} justifyContent={'space-between'}>
                                        <Typography fontSize={15} variant="button">
                                            {index + 1}
                                        </Typography>
                                        {status(row) !== 'Admin' &&
                                            <Box>
                                                <Delete onClick={() => { removeUser(row._id as string) }} />
                                            </Box>}
                                    </Box>
                                </StyledTableCell>
                                <StyledTableCell>{row.userName}</StyledTableCell>
                                <StyledTableCell>{row.email}</StyledTableCell>
                                <StyledTableCell>{userStatus(status(row), row._id!)}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </UserTable>
            </TableContainer>
        </Box>
    );
}
