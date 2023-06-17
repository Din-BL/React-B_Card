import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Title from '../components/Title';
import B_Card from '../components/B_Card';

function Home() {
    return (
        <Box component={'main'} sx={{ minHeight: '85dvh' }}>
            <Title main="Cards Page" sub="Here you can find business cards from all catagories" />
            <Stack direction="row" spacing={2}>
                <B_Card />
            </Stack>
        </Box>
    )
}
export default Home