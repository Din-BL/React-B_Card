import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow, Box, Typography, Paper, TableCell, tableCellClasses, IconButton, Badge } from '@mui/material';
import { Delete, Phone, Language, Favorite } from '@mui/icons-material';
import { BusinessCard, TableModeProps } from '../utils/types';
import { capitalizeFirstLetter, favoriteRating, pathUrl } from '../utils/helpers';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginInfoContext } from '../context/LoginInfo';
import { AllCardsContext } from '../context/Cards';
import FavoriteIcon from './FavoriteIcon';

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

export default function TableMode({ cards }: TableModeProps) {
    const navigate = useNavigate()
    const location = useLocation()
    const { loginInfo } = React.useContext(LoginInfoContext)
    const { removeCard } = React.useContext(AllCardsContext)
    const { logged, admin } = loginInfo
    const excludedProperties = ["imageUrl", "imageAlt", "_id", "description", "houseNumber", "web", "state", "zip", "user_id", "__v", "isFavorite"];
    let card = Object.keys(cards[0])
    card = card.filter(property => !excludedProperties.includes(property));
    card = card.map(property => capitalizeFirstLetter(property))

    function adminFavorite(card: BusinessCard) {
        if (logged) {
            if (!(admin && pathUrl(`favorite/`, location))) {
                return <FavoriteIcon card={card} />
            }
        }
    }

    const trashView = () => {
        if (pathUrl(`favorite`, location)) return false
        if (pathUrl(`home`, location) && !admin) return false
        return true
    }

    return (
        <Box paddingBottom={3}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
                                        {trashView() &&
                                            <IconButton sx={{ padding: '6px' }} onClick={() => removeCard(row)} aria-label="delete">
                                                <Delete color='action' />
                                            </IconButton>}
                                        <IconButton sx={{ padding: '6px' }} onClick={() => window.location.href = `tel://${row.phone}`} aria-label="phone" >
                                            <Phone color='action' />
                                        </IconButton>
                                        {adminFavorite(row)}
                                        {(admin && pathUrl(`favorite/`, location)) &&
                                            <Badge anchorOrigin={{ vertical: 'top', horizontal: 'left' }} badgeContent={favoriteRating(row)} color="primary">
                                                <Favorite color="error" />
                                            </Badge>}
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
                </Table>
            </TableContainer>
        </Box>
    );
}
