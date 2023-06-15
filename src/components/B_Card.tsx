import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import image from '../assets/pexels-fauxels-3183197.jpg';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';



export default function B_Card() {
    return (
        <Card sx={{ maxWidth: 345, marginY: 2 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={image}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    Computer Company
                </Typography>
                <Typography paddingY={1} borderBottom={'1px solid #9d9d9d'} variant="body2" color="text.secondary">
                    Computer Company Sub Title
                </Typography>
                <Typography paddingTop={1} variant="body2" color="text.secondary">
                    <span style={{ fontWeight: "bold" }}> Phone:</span> 0532445677
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <span style={{ fontWeight: "bold" }}> Address:</span> test 56
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <span style={{ fontWeight: "bold" }}> Card Number:</span> 456345
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <DeleteIcon color='action' />
                <Box>
                    <PhoneIcon sx={{ marginRight: '10px' }} color='action' />
                    <FavoriteIcon sx={{ marginRight: '10px' }} color='action' />
                </Box>
            </CardActions>
        </Card>
    );
}
