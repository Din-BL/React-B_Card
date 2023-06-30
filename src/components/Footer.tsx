import { Typography, Box, Stack, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { FooterLink } from './FooterLink'
import { getData } from '../utils/localStorage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    useNavigate() /* makes the icons re-render after login */
    return (
        <Paper sx={{ paddingY: '10px' }} elevation={3}>
            <Box display="flex" justifyContent="center" alignItems="center" paddingBottom='10px'>
                <Stack direction="row" spacing={9}>
                    <FooterLink to="/about" icon={<InfoIcon color="action" />} text="About" />
                    {getData('user', 'token') &&
                        <FooterLink to={`/favorite/${getData('user', '_id')}`} icon={<FavoriteIcon color="action" />} text="Favorite" />
                    }
                    {getData('user', 'business') &&
                        <FooterLink to={`/my cards/${getData('user', '_id')}`} icon={<RecentActorsIcon color="action" />} text="My Cards" />
                    }
                </Stack>
            </Box>
        </Paper>
    );
}


