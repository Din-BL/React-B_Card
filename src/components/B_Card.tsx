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

interface B_CardProps {
    card: BusinessCard
}

export default function B_CARD({ card }: B_CardProps) {
    const location = useLocation()
    const favoriteCard = () => {
        // if(email is valid)
        const favData = localStorage.getItem(getData('user', 'email'))
        if (favData) {
            if (JSON.parse(favData).some((data: BusinessCard) => data.zip === card.zip)) {
                localStorage.setItem(getData('user', 'email'), JSON.stringify(JSON.parse(favData).filter((cardInfo: BusinessCard) => cardInfo.zip !== card.zip)));
            } else {
                localStorage.setItem(getData('user', 'email'), JSON.stringify([...JSON.parse(favData), card]));
            }
        } else {
            localStorage.setItem(getData('user', 'email'), JSON.stringify([card]))
        }

    }
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt={card.imageAlt}
                height="140"
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
                        <CheckBox onClick={favoriteCard} icon={<FavoriteBorder />} checkedIcon={<Favorite />} color='error' sx={{ padding: 0 }} />
                    }
                </Stack>
            </CardActions>
        </Card>
    );
}
