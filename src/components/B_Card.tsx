import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CheckBox from '@mui/material/Checkbox';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import image from '../assets/pexels-fauxels-3183197.jpg';
import PhoneIcon from '@mui/icons-material/Phone';
import Favorite from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { FavoriteBorder } from '@mui/icons-material';
import { BusinessCard } from '../utils/types';
import { addressFormatter, phoneFormatter } from '../utils/helpers';
import { getData } from '../utils/token';
import { useLocation } from 'react-router-dom';
import { useToggle } from '../hooks/useToggle';

interface B_CardProps {
    card: BusinessCard;
    setCards?: React.Dispatch<any>
}

export default function B_CARD({ card, setCards }: B_CardProps) {
    const location = useLocation()
    const [checked, toggle] = useToggle(card)

    const favoriteCard = () => {
        toggle()
        let favData = localStorage.getItem(getData('user', 'userName'))
        if (favData) {
            if (JSON.parse(favData).some((data: BusinessCard) => data._id === card._id)) {
                localStorage.setItem(getData('user', 'userName'), JSON.stringify(JSON.parse(favData).filter((cardInfo: BusinessCard) => cardInfo._id !== card._id)));
                favData = localStorage.getItem(getData('user', 'userName'));
                setCards && setCards(JSON.parse(favData as string))
            } else {
                localStorage.setItem(getData('user', 'userName'), JSON.stringify([...JSON.parse(favData), { ...card, isFavorite: true }]));
            }
        } else {
            localStorage.setItem(getData('user', 'userName'), JSON.stringify([{ ...card, isFavorite: true }]))
        }

    }
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt={card.imageAlt}
                height="220"
                image={card.imageUrl}
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    {card.title}
                </Typography>
                <Typography paddingY={1} borderBottom={'1px solid #9d9d9d'} variant="body2" color="text.secondary">
                    {card.subtitle}
                </Typography>
                <Typography paddingTop={1} variant="body2" color="text.secondary">
                    <span style={{ fontWeight: "bold" }}> Phone:</span> {phoneFormatter(card.phone)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <span style={{ fontWeight: "bold" }}> Address:</span> {addressFormatter(card.city, card.street, card.houseNumber)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <span style={{ fontWeight: "bold" }}> Card Number:</span> {card.zip}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Stack direction={'row'} spacing={1} >
                    {location.pathname === '/my cards' &&
                        <DeleteIcon color='action' />}
                    {location.pathname === '/my cards' &&
                        <EditIcon color='action' />
                    }
                </Stack>
                <Stack direction={'row'} spacing={1} >
                    <PhoneIcon color='action' />
                    {getData('user', 'token') &&
                        <CheckBox onClick={favoriteCard} checked={checked} icon={<FavoriteBorder />} checkedIcon={<Favorite />} color='error' sx={{ padding: 0 }} />
                    }
                </Stack>
            </CardActions>
        </Card>
    );
}
