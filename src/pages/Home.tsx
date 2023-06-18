import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Title from '../components/Title';
import B_Card from '../components/B_Card';
import { Container } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

function Home() {
    return (
        <Container >
            <Box component={'main'} sx={{ minHeight: '85dvh' }}>
                <Title main="Cards Page" sub="Here you can find business cards from all catagories" />
                <Stack direction="row" spacing={2}>
                    <B_Card />
                    <B_Card />
                    <B_Card />
                    <B_Card />
                    <B_Card />
                </Stack>
                <Box sx={{ position: 'relative', padding: 10 }}>
                    <AddCircleRoundedIcon sx={{ position: 'absolute', right: 0 }} style={{ fontSize: '50px' }} color='primary' />
                </Box>
            </Box>
        </Container>

    )
}
export default Home