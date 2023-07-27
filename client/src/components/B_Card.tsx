import { Card, CardActions, Checkbox, CardContent, CardMedia, Typography, Stack, Box, IconButton } from '@mui/material';
import { Phone, Favorite, Delete, Edit, FavoriteBorder } from '@mui/icons-material';
import { B_CardProps, BusinessCard } from '../utils/types';
import { addressFormatter, defaultAlt, defaultImage, errorMsg, idShortcut, pathUrl, phoneFormatter, removeDefaultCard } from '../utils/helpers';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToggle } from '../hooks/useToggle';
import { deleteCard } from '../utils/services';
import { toast } from 'react-toastify';
import { CardsContext, DataContext, FavoriteContext } from '../context/Cards';
import { useContext } from 'react';
import { favoriteCard } from '../utils/favorite';
import { LoginInfoContext } from '../context/LoginInfo';
import { removeAlert } from '../utils/sweetalert';
import { getData, setData } from '../utils/localStorage';

export default function B_CARD({ card }: B_CardProps) {
    const location = useLocation()
    const [checked, toggle] = useToggle(card)
    const { loginInfo, setLoginInfo } = useContext(LoginInfoContext)
    const { logged, admin } = loginInfo
    const { deleteData } = useContext(DataContext)
    const { setFavorite, deleteFavorite } = useContext(FavoriteContext)
    const { setCards } = useContext(CardsContext)
    const navigate = useNavigate()
    const trashView = (pathUrl(`my-cards`, location) || pathUrl(`home`, location)) && admin

    function removeCard() {
        removeAlert()
            .then((result) => {
                if (result.isConfirmed && card._id) {
                    const favData: BusinessCard[] = getData((getData('user', 'userName')))
                    favData && setData(getData('user', 'userName'), favData.filter((cardInfo: BusinessCard) => cardInfo._id !== card._id))
                    favData && deleteFavorite(card._id)
                    if (pathUrl(`home`, location)) {
                        removeDefaultCard(card._id, setCards)
                    } else {
                        deleteCard(card._id)
                            .then((info) => {
                                toast.success(`${info.data.title} been removed`)
                                deleteData(card._id!)
                            })
                            .catch(e => errorMsg(e, navigate, setLoginInfo))
                    }
                }
            })
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
                        {trashView &&
                            <IconButton sx={{ padding: '6px' }} onClick={removeCard} aria-label="delete">
                                <Delete color='action' />
                            </IconButton>
                        }
                        {pathUrl(`my-cards/`, location) &&
                            <IconButton sx={{ padding: '6px' }} onClick={() => navigate(`/edit/${card._id}`)} aria-label="edit" >
                                <Edit color='action' />
                            </IconButton>
                        }
                    </Box>
                    <Box >
                        <IconButton sx={{ padding: '6px' }} onClick={() => window.location.href = `tel://${card.phone}`} aria-label="phone" >
                            <Phone color='action' />
                        </IconButton>
                        {logged &&
                            <IconButton sx={{ padding: '6px' }} onClick={() => favoriteCard(toggle, card, setFavorite)} aria-label="favorite" >
                                <Checkbox sx={{ padding: 0 }}
                                    checked={checked}
                                    icon={<FavoriteBorder />}
                                    checkedIcon={<Favorite />}
                                    color='error'
                                />
                            </IconButton>
                        }
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
}
