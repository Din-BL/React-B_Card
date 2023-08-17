import * as React from 'react';
import { styled } from '@mui/material/styles';
import { TableBody, TableContainer, TableHead, TableRow, Box, Typography, Paper, TableCell, tableCellClasses, IconButton, Checkbox, Alert } from '@mui/material';
import UserTable from '@mui/material/Table';
import { Delete, Favorite, FavoriteBorder, Phone, Language } from '@mui/icons-material';
import { TableModeProps, TableProps, UserStatus } from '../utils/types';
import { deleteUser } from '../utils/services';
import { toast } from 'react-toastify';
import { capitalizeFirstLetter, errorMsg, sortUser, status } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { LoginInfoContext } from '../context/LoginInfo';
import { removeAlert } from '../utils/sweetalert';
import Select from './Select';
import { favoriteCard } from '../utils/favorite';
import { useToggle } from '../hooks/useToggle';

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

export default function TableMode({ cards }: TableModeProps/*{ Users, userDeletion }:*/) {
    const navigate = useNavigate()
    const { loginInfo, setLoginInfo } = React.useContext(LoginInfoContext)
    const { logged } = loginInfo
    // const [checked, toggle] = useToggle(card)

    const excludedProperties = ["imageUrl", "imageAlt", "_id", "description", "houseNumber", "web", "state", "zip", "user_id", "__v", "isFavorite"];


    // function removeUser(id: string, username: string) {
    //     removeAlert()
    //         .then((result) => {
    //             if (result.isConfirmed) {
    //                 deleteUser(id)
    //                     .then(() => {
    //                         toast.success(`${username} has been removed`)
    //                         // userDeletion(id)
    //                     })
    //                     .catch(e => errorMsg(e, navigate, setLoginInfo))
    //             }
    //         })
    // }


    let card = Object.keys(cards[0])
    card = card.filter(property => !excludedProperties.includes(property));
    card = card.map(property => capitalizeFirstLetter(property))
    return (
        <Box paddingBottom={3}>
            <TableContainer component={Paper}>
                <UserTable sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No.</StyledTableCell>
                            {card.map((property, index) => (
                                <StyledTableCell key={index}>{property}</StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                        <Typography paddingRight={index > 8 ? 3 : 4} fontSize={15} variant="button">
                                            {index + 1}
                                        </Typography>
                                        {status(row) !== 'Admin' &&
                                            <IconButton sx={{ padding: '6px' }} /* onClick={removeCard} */ aria-label="delete">
                                                <Delete color='action' />
                                            </IconButton>}
                                        <IconButton sx={{ padding: '6px' }} onClick={() => window.location.href = `tel://${row.phone}`} aria-label="phone" >
                                            <Phone color='action' />
                                        </IconButton>
                                        {logged &&
                                            <IconButton sx={{ padding: '6px' }} /* onClick={() => favoriteCard(toggle, card, setFavorite)} */ aria-label="favorite" >
                                                <Checkbox sx={{ padding: 0 }}
                                                    /*  checked={checked} */
                                                    icon={<FavoriteBorder />}
                                                    checkedIcon={<Favorite />}
                                                    color='error'
                                                />
                                            </IconButton>
                                        }
                                        <IconButton sx={{ padding: '6px' }} onClick={() => navigate(`/business/${row._id}`)} aria-label="website" >
                                            <Language color='action' />
                                        </IconButton>
                                    </Box>
                                </StyledTableCell>
                                {Object.values(row).map((value, index) => (
                                    !excludedProperties.includes(Object.keys(row)[index]) && (
                                        <StyledTableCell key={index}>{value}</StyledTableCell>
                                    )
                                ))}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </UserTable>
            </TableContainer>
        </Box>
    );

}
