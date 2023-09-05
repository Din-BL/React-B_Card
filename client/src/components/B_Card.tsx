import { Card, CardActions, CardContent, CardMedia, Typography, Box, IconButton, Badge } from '@mui/material';
import { Phone, Delete, Edit, Favorite } from '@mui/icons-material';
import { B_CardProps } from '../utils/types';
import { addressFormatter, defaultAlt, defaultImage, favoriteRating, idShortcut, pathUrl, phoneFormatter } from '../utils/helpers';
import { useLocation, useNavigate } from 'react-router-dom';
import { AllCardsContext } from '../context/Cards';
import { useContext } from 'react';
import { LoginInfoContext } from '../context/LoginInfo';
import FavoriteIcon from './FavoriteIcon';

export default function B_CARD({ card }: B_CardProps) {
    const navigate = useNavigate()
    const location = useLocation()
    const { loginInfo } = useContext(LoginInfoContext)
    const { logged, admin } = loginInfo
    const { removeCard } = useContext(AllCardsContext)
    const isFavoritePage = pathUrl(`favorite/`, location)

    function adminFavorite() {
        if (logged) {
            if (!(admin && isFavoritePage)) {
                return <FavoriteIcon card={card} />
            }
        }
    }

    const trashView = () => {
        if (isFavoritePage) return false
        if (pathUrl(`home`, location) && !admin) return false
        return true
    }

    return (
        <Box display={'flex'} justifyContent={'center'}  >
            <Card sx={{ width: 345, height: 444, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{ cursor: 'pointer' }} onClick={() => navigate(`/business/${card._id}`)}>
                    <CardMedia
                        component="img"
                        alt={defaultAlt(card.imageAlt)}
                        height="220"
                        image={defaultImage(card.imageUrl)}
                    />
                    <CardContent sx={{ padding: '12px' }}>
                        <Typography variant="h6" component="div">
                            {card.title}
                        </Typography>
                        <Typography paddingBottom={1} borderBottom={'1px solid #9d9d9d'} variant="body2" color="text.secondary">
                            {card.subtitle}
                        </Typography>
                        <Typography paddingTop={1} variant="body2" color="text.secondary">
                            <span style={{ fontWeight: "bold" }}> Phone: </span>
                            {phoneFormatter(card.phone)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <span style={{ fontWeight: "bold" }}> Address: </span>
                            {addressFormatter(card.city, card.street, card.houseNumber)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <span style={{ fontWeight: "bold" }}> Card Number: </span>{idShortcut(card._id!)}
                        </Typography>
                    </CardContent>
                </Box>
                <CardActions sx={{ justifyContent: 'space-between', padding: '4px' }}>
                    <Box >
                        {trashView() &&
                            <IconButton sx={{ padding: '6px' }} onClick={() => removeCard(card)} aria-label="delete">
                                <Delete color='action' />
                            </IconButton>
                        }
                        {pathUrl(`my-cards/`, location) &&
                            <IconButton sx={{ padding: '6px' }} onClick={() => navigate(`edit/${card._id}`)} aria-label="edit" >
                                <Edit color='action' />
                            </IconButton>
                        }
                    </Box>
                    <Box >
                        <IconButton sx={{ padding: '6px' }} onClick={() => window.location.href = `tel://${card.phone}`} aria-label="phone" >
                            <Phone color='action' />
                        </IconButton>
                        {adminFavorite()}
                        {(admin && isFavoritePage) &&
                            <Badge anchorOrigin={{ vertical: 'top', horizontal: 'left' }} badgeContent={favoriteRating(card)} color="primary">
                                <Favorite color="error" />
                            </Badge>}
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
}
