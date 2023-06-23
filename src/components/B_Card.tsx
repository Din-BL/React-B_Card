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

export default function B_CARD({ imageUrl, imageAlt, title, subtitle, phone, country, city, street, houseNumber, zip }: BusinessCard) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt={imageAlt}
                height="140"
                image={imageUrl}
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    {title}
                </Typography>
                <Typography paddingY={1} borderBottom={'1px solid #9d9d9d'} variant="body2" color="text.secondary">
                    {subtitle}
                </Typography>
                <Typography paddingTop={1} variant="body2" color="text.secondary">
                    <span style={{ fontWeight: "bold" }}> Phone:</span> {phoneFormatter(phone)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <span style={{ fontWeight: "bold" }}> Address:</span> {addressFormatter(city, street, houseNumber)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <span style={{ fontWeight: "bold" }}> Card Number:</span> {zip}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Stack direction={'row'} spacing={1} >
                    <DeleteIcon color='action' />
                    <EditIcon color='action' />
                </Stack>
                <Stack direction={'row'} spacing={1} >
                    <PhoneIcon color='action' />
                    <CheckBox icon={<FavoriteBorder />} checkedIcon={<Favorite />} color='error' sx={{ padding: 0 }} />
                </Stack>
            </CardActions>
        </Card>
    );
}
