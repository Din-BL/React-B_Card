import { Card, CardActions, CardContent, CardMedia, Typography, Box, IconButton, Badge } from '@mui/material';
import { Phone, Delete, Edit, Favorite } from '@mui/icons-material';
import { B_CardProps, BusinessCard } from '../utils/types';
import { addressFormatter, defaultAlt, defaultImage, errorMsg, favoriteRating, idShortcut, limitedRequests, pathUrl, phoneFormatter, removeDefaultCard } from '../utils/helpers';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteCard } from '../utils/services';
import { toast } from 'react-toastify';
import { AllCardsContext, CardsContext, FavoriteContext } from '../context/Cards';
import { useContext } from 'react';
import { LoginInfoContext } from '../context/LoginInfo';
import { errorAlert, removeAlert } from '../utils/sweetalert';
import { getData, setData } from '../utils/localStorage';
import FavoriteIcon from './FavoriteIcon';

export default function B_CARD({ card }: B_CardProps) {
    const navigate = useNavigate()
    const location = useLocation()
    const { loginInfo, setLoginInfo } = useContext(LoginInfoContext)
    const { logged, admin } = loginInfo
    const { deleteData } = useContext(CardsContext)
    const { deleteFavorite } = useContext(FavoriteContext)
    const { setCards } = useContext(AllCardsContext)
    const storageList = Object.keys(localStorage);
    const users = storageList.filter(item => /^[A-Z]/.test(item));

    console.log(users);

    function removeCard() {
        removeAlert()
            .then((result) => {
                if (result.isConfirmed && card._id) {
                    if (limitedRequests(navigate)) {
                        errorAlert()
                    } else {
                        const favData: BusinessCard[] = getData(getData('userInfo', 'userName'))
                        favData && setData(getData('userInfo', 'userName'), favData.filter((cardInfo: BusinessCard) => cardInfo._id !== card._id))
                        favData && deleteFavorite(card._id)
                        if (pathUrl(`home`, location)) {
                            removeDefaultCard(card._id, setCards)
                            const favoriteCards = getData('favoriteCards')
                            const updatedCards = favoriteCards.filter((favCard: BusinessCard) => favCard._id !== card._id)
                            setData('favoriteCards', updatedCards)
                        } else {
                            deleteCard(card._id)
                                .then((info) => {
                                    toast.success(`${info.data.title} been removed`)
                                    deleteData(card._id!)
                                })
                                .catch(e => errorMsg(e, navigate, setLoginInfo))
                        }
                    }
                }
            })
    }

    function adminFavorite() {
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
                            <IconButton sx={{ padding: '6px' }} onClick={removeCard} aria-label="delete">
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
                        {(admin && pathUrl(`favorite/`, location)) &&
                            <Badge anchorOrigin={{ vertical: 'top', horizontal: 'left' }} badgeContent={favoriteRating(card)} color="primary">
                                <Favorite color="error" />
                            </Badge>}
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
}
