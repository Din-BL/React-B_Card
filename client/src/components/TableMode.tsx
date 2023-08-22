import * as React from 'react';
import { styled } from '@mui/material/styles';
import { TableBody, TableContainer, TableHead, TableRow, Box, Typography, Paper, TableCell, tableCellClasses, IconButton } from '@mui/material';
import UserTable from '@mui/material/Table';
import { Delete, Phone, Language } from '@mui/icons-material';
import { BusinessCard, TableModeProps } from '../utils/types';
import { toast } from 'react-toastify';
import { capitalizeFirstLetter, errorMsg, pathUrl, removeDefaultCard, status } from '../utils/helpers';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginInfoContext } from '../context/LoginInfo';
import { removeAlert } from '../utils/sweetalert';
import { getData, setData } from '../utils/localStorage';
import { AllCardsContext, CardsContext, FavoriteContext } from '../context/Cards';
import { deleteCard } from '../utils/services';
import FavoriteIcon from './FavoriteIcon';

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

export default function TableMode({ cards }: TableModeProps) {
    const navigate = useNavigate()
    const location = useLocation()
    const { loginInfo, setLoginInfo } = React.useContext(LoginInfoContext)
    const { logged, admin } = loginInfo
    const trashView = !pathUrl(`favorite`, location) && admin
    const { deleteData } = React.useContext(CardsContext)
    const { deleteFavorite } = React.useContext(FavoriteContext)
    const { setCards } = React.useContext(AllCardsContext)
    const excludedProperties = ["imageUrl", "imageAlt", "_id", "description", "houseNumber", "web", "state", "zip", "user_id", "__v", "isFavorite"];
    let card = Object.keys(cards[0])
    card = card.filter(property => !excludedProperties.includes(property));
    card = card.map(property => capitalizeFirstLetter(property))

    function removeCard(cardId?: string) {
        removeAlert()
            .then((result) => {
                if (result.isConfirmed && cardId) {
                    const favData: BusinessCard[] = getData((getData('userInfo', 'userName')))
                    favData && setData(getData('userInfo', 'userName'), favData.filter((cardInfo: BusinessCard) => cardInfo._id !== cardId))
                    favData && deleteFavorite(cardId)
                    if (pathUrl(`home`, location)) {
                        removeDefaultCard(cardId, setCards)
                    } else {
                        deleteCard(cardId)
                            .then((info) => {
                                toast.success(`${info.data.title} been removed`)
                                deleteData(cardId!)
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
                                        {trashView &&
                                            <IconButton sx={{ padding: '6px' }} onClick={() => removeCard(row._id)} aria-label="delete">
                                                <Delete color='action' />
                                            </IconButton>}
                                        <IconButton sx={{ padding: '6px' }} onClick={() => window.location.href = `tel://${row.phone}`} aria-label="phone" >
                                            <Phone color='action' />
                                        </IconButton>
                                        {logged &&
                                            <FavoriteIcon card={row} />
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
