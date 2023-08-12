import Title from '../components/Title';
import B_CARD from '../components/B_Card';
import { BusinessCard } from '../utils/types';
import { useContext } from 'react';
import { AllCardsContext } from '../context/Cards';
import { Container, Grid, Box, Alert } from '@mui/material';
import TableMode from '../components/TableMode';
import { ViewContext } from '../context/ViewMode';

function Home() {
    const { cards } = useContext(AllCardsContext)
    const { view } = useContext(ViewContext)
    return (
        <Container maxWidth='lg' sx={{ paddingBottom: 3 }}>
            <Box component={'main'} flexGrow={1} minHeight='85dvh' >
                <Title main="Business Cards" sub="Here you can find business cards from all catagories" />
                {cards.length === 0 && <Alert variant="outlined" severity="info">There are no business cards available</Alert>}
                {view === 'grid' ?
                    <Grid container spacing={{ xs: 4, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 9, lg: 12 }}>
                        {cards.map((card: BusinessCard) => (
                            <Grid key={card._id} item xs={4} sm={4} md={3} >
                                <B_CARD card={card} />
                            </Grid>
                        ))}
                    </Grid>
                    : <TableMode cards={cards} />}
            </Box>
        </Container>
    )
}
export default Home


