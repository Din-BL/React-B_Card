import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Title from '../components/Title';
import B_CARD from '../components/B_Card';
import { Container } from '@mui/material';
import { getData } from '../utils/token';
import { BusinessCard } from '../utils/types';
import { useEffect, useState } from 'react';

function Favorite() {
    const [cards, setCards] = useState(() => {
        const favCards = localStorage.getItem(getData('user', 'userName')) || '[]'
        return JSON.parse(favCards)
    })

    return (
        <Container >
            <Box component={'main'} sx={{ minHeight: '85dvh' }}>
                <Title main="Favorite Cards" sub="Here you can find business cards from all catagories" />
                <Stack direction="row" spacing={2} paddingBottom={3}>
                    {
                        cards.map((card: BusinessCard) => {
                            return <B_CARD key={card._id} card={card} setCards={setCards} />
                        })}
                </Stack>
            </Box>
        </Container>
    );
}

export default Favorite;