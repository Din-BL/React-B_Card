import Title from '../components/Title';
import B_CARD from '../components/B_Card';
import { BusinessCard } from '../utils/types';
import { useContext } from 'react';
import { CardsContext } from '../context/Cards';
import { Container, Grid, Box, Alert } from '@mui/material';

function Home() {
    const { cards } = useContext(CardsContext)
    return (
        <Container maxWidth='lg' sx={{ paddingBottom: 3 }}>
            <Box component={'main'} flexGrow={1} minHeight='85dvh' >
                <Title main="Business Cards" sub="Here you can find business cards from all catagories" />
                {cards.length === 0 && <Alert variant="outlined" severity="info">No business card has been registered yet</Alert>}
                <Grid container spacing={{ xs: 4, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {cards.map((card: BusinessCard) => (
                        <Grid key={card._id} item xs={4} sm={4} md={3} >
                            <B_CARD card={card} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    )
}
export default Home


