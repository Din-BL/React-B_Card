import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CheckBox from '@mui/material/Checkbox';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PhoneIcon from '@mui/icons-material/Phone';
import Favorite from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { FavoriteBorder } from '@mui/icons-material';
import { B_CardProps, BusinessCard } from '../utils/types';
import { addressFormatter, defaultAlt, defaultImage, logout, pathUrl, phoneFormatter } from '../utils/helpers';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useToggle } from '../hooks/useToggle';
import { deleteCard } from '../utils/services';
import { toast } from 'react-toastify';
import { CardsContext, DataContext, FavoriteContext } from '../context/Cards';
import { useContext } from 'react';
import { favoriteCard } from '../utils/favorite';
import { LoginInfoContext } from '../context/LoginInfo';
import { remove } from '../utils/sweetalert';
import { getData, setData } from '../utils/localStorage';


export default function B_CARD({ card }: B_CardProps) {
    const location = useLocation()
    const [checked, toggle] = useToggle(card)
    const { id } = useParams()
    const { loginInfo, setLoginInfo } = useContext(LoginInfoContext)
    const { logged, admin } = loginInfo
    const { deleteData } = useContext(DataContext)
    const { setFavorite } = useContext(FavoriteContext)
    const { setCards } = useContext(CardsContext)
    const navigate = useNavigate()
    const trashView = pathUrl(`/my%20cards/`, location, id) || pathUrl(`/`, location, id) && admin

    function removeDefaultCard(id: string) {
        const storedCards = getData("defaultCards")
        const filteredCards = storedCards.filter((card: BusinessCard) => card._id !== id)
        const removed = storedCards.filter((card: BusinessCard) => card._id === id)
        let removedCards = getData("removedCards")
        !removedCards ? removedCards = removed : removedCards = [...removedCards, ...removed]
        setData('removedCards', removedCards)
        setData("defaultCards", filteredCards)
        setCards(filteredCards)
    }

    function removeCard() {
        remove()
            .then((result) => {
                if (result.isConfirmed) {
                    if (card._id) {
                        if (pathUrl(`/`, location, id)) {
                            removeDefaultCard(card._id)
                        } else {
                            deleteCard(card._id)
                                .then(() => {
                                    toast.success('Business been removed')
                                    deleteData(card._id as string)
                                })
                                .catch(e => {
                                    const errMsg = e.response.data
                                    toast.warning(errMsg)
                                    errMsg.includes('expired') && logout(navigate, setLoginInfo)
                                })
                        }
                    }
                }
            })
    }

    return (
        <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardMedia
                component="img"
                alt={defaultAlt(card.imageAlt)}
                height="220"
                image={defaultImage(card.imageUrl)}
            />
            <CardContent>
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
                    <span style={{ fontWeight: "bold" }}> Card Number: </span>{card.zip}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Stack direction={'row'} spacing={1} >
                    {trashView &&
                        <DeleteIcon onClick={removeCard} color='action' />}
                    {pathUrl(`/my%20cards/`, location, id) &&
                        <EditIcon onClick={() => navigate(`/edit/${card._id}`)} color='action' />
                    }
                </Stack>
                <Stack direction={'row'} spacing={1} >
                    <PhoneIcon onClick={() => navigate(`/business/${card._id}`)} color='action' />
                    {logged &&
                        <CheckBox onClick={() => favoriteCard(toggle, card, setFavorite)}
                            checked={checked}
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite />}
                            color='error'
                            sx={{ padding: 0 }} />
                    }
                </Stack>
            </CardActions>
        </Card>
    );
}
