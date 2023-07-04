import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Title from '../components/Title';
import B_CARD from '../components/B_Card';
import { Container } from '@mui/material';
import { getData } from '../utils/localStorage';
import { BusinessCard } from '../utils/types';
import { useContext, useEffect, useState } from 'react';
import { FavoriteContext } from '../context/Cards';

function Favorite() {
    const { favorite } = useContext(FavoriteContext)

    return (
        <Container >
            <Box component={'main'} sx={{ minHeight: '85dvh' }}>
                <Title main="Favorite Cards" sub="Here you can find business cards from all catagories" />
                <Stack direction="row" spacing={2} paddingBottom={3}>
                    {favorite.map((card: BusinessCard) => {
                        return <B_CARD key={card._id} card={card} />
                    })}
                </Stack>
            </Box>
        </Container>
    );
}

export default Favorite;