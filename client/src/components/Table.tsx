import * as React from 'react';
import { styled } from '@mui/material/styles';
import { TableBody, TableContainer, TableHead, TableRow, Box, Typography, Paper, TableCell, tableCellClasses, IconButton } from '@mui/material';
import UserTable from '@mui/material/Table';
import { Delete } from '@mui/icons-material';
import { TableProps, UserStatus } from '../utils/types';
import { deleteUserAdmin } from '../utils/services';
import { toast } from 'react-toastify';
import { errorMsg, filteredCards, limitedRequests, removeDefaultCard, removeDuplicateCards, removeLimitedRequestsUser, sortUser, status, uniqueFavorites, usernameStorageSync } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { LoginInfoContext } from '../context/LoginInfo';
import { errorAlert, removeAlert } from '../utils/sweetalert';
import Select from './Select';
import { getData, removeData, setData } from '../utils/localStorage';
import { AllCardsContext, FavoriteContext } from '../context/Cards';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: { fontSize: 14 }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:last-child td, &:last-child th': { border: 0 }
}));

export default function Table({ Users, userDeletion }: TableProps) {
    const navigate = useNavigate()
    const favoriteCards = getData('favoriteCards')
    const { setFavorite } = React.useContext(FavoriteContext)
    const { setCards } = React.useContext(AllCardsContext)
    const { setLoginInfo } = React.useContext(LoginInfoContext)

    function userStatus(status: UserStatus, id: string, username: string) {
        return status !== 'Admin' ? <Select userStatus={status} userId={id} username={username} /> : status
    }

    function removeUser(id: string, username: string) {
        removeAlert()
            .then((result) => {
                if (result.isConfirmed) {
                    if (limitedRequests(navigate)) {
                        errorAlert()
                    } else {
                        deleteUserAdmin(id)
                            .then((info) => {
                                if (favoriteCards) {
                                    setData('favoriteCards', filteredCards(favoriteCards, info.data))
                                    const updatedCards = removeDuplicateCards(getData('favoriteCards'), getData(username))
                                    setData('favoriteCards', updatedCards)
                                    setFavorite(uniqueFavorites())
                                    removeData(username)
                                    usernameStorageSync(info.data)
                                } removeDefaultCard(info.data, setCards)
                                removeLimitedRequestsUser(username)
                                userDeletion(id)
                                toast.success(`${username} has been removed`)
                            })
                            .catch(e => errorMsg(e, navigate, setLoginInfo))
                    }
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
                                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                        <Typography fontSize={15} variant="button">
                                            {index + 1}
                                        </Typography>
                                        {status(row) !== 'Admin' &&
                                            <IconButton sx={{ padding: '6px' }} onClick={() => { removeUser(row._id!, row.userName) }} aria-label="delete">
                                                <Delete color='action' />
                                            </IconButton>}
                                    </Box>
                                </StyledTableCell>
                                <StyledTableCell>{row.userName}</StyledTableCell>
                                <StyledTableCell>{row.email}</StyledTableCell>
                                <StyledTableCell>{userStatus(status(row), row._id!, row.userName)}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </UserTable>
            </TableContainer>
        </Box>
    );
}
