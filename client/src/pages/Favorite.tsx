import Title from '../components/Title';
import B_CARD from '../components/B_Card';
import { BusinessCard } from '../utils/types';
import { useContext } from 'react';
import { FavoriteContext } from '../context/Cards';
import { Container, Grid, Box, Alert } from '@mui/material';

function Favorite() {
    const { favorite } = useContext(FavoriteContext)
    return (
        <Container sx={{ paddingBottom: 3 }}>
            <Box component={'main'} flexGrow={1} minHeight='85dvh' >
                <Title main="Favorite Cards" sub="Here you can find your favorite business cards" />
                {favorite?.length === 0 && <Alert variant="outlined" severity="info">No favorite business card has been chosen yet</Alert>}
                <Grid container spacing={{ xs: 4, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {favorite && favorite.map((card: BusinessCard) => (
                        <Grid key={card._id} item xs={4} sm={4} md={3} >
                            <B_CARD card={card} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}

export default Favorite;