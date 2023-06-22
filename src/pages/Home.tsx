import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Title from '../components/Title';
import B_CARD from '../components/B_Card';
import { Container } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import useCards from '../hooks/useCards';
import { BusinessCard } from '../utils/types';

function Home() {
    const navigate = useNavigate()
    const cards = useCards()
    return (
        <Container >
            <Box component={'main'} sx={{ minHeight: '85dvh' }}>
                <Title main="Cards Page" sub="Here you can find business cards from all catagories" />
                <Stack direction="row" spacing={2}>
                    {cards.map((card: BusinessCard) => {
                        return <B_CARD key={card._id} {...card} />
                    })}
                </Stack>
                <Box sx={{ display: 'flex', justifyContent: 'end', pt: 3, pb: 12 }}>
                    <Fab color="primary" aria-label="add">
                        <AddIcon onClick={() => navigate('add card')} />
                    </Fab>
                </Box>
            </Box>
        </Container>

    )
}
export default Home