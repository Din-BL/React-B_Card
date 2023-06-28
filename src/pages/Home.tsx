import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Title from '../components/Title';
import B_CARD from '../components/B_Card';
import { Container } from '@mui/material';
import Fab from '@mui/material/Fab';
import { useNavigate } from 'react-router-dom';
import useCards from '../hooks/useCards';
import { BusinessCard } from '../utils/types';
import { getData } from '../utils/token';

function Home() {
    const cards = useCards()
    return (
        <Container >
            <Box component={'main'} sx={{ minHeight: '85dvh' }}>
                <Title main="Cards Page" sub="Here you can find business cards from all catagories" />
                <Stack direction="row" spacing={2} paddingBottom={3}>
                    {cards.map((card: BusinessCard, index: number) => {
                        return <B_CARD key={card._id} card={card} />
                    })}
                </Stack>
            </Box>
        </Container>

    )
}
export default Home