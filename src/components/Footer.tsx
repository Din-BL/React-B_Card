import { Typography, Box, Stack, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { FooterLink } from './FooterLink'
import { getData } from '../utils/localStorage';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginInfoContext } from '../context/LoginInfo';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function Footer() {
    const id = getData('user', '_id')
    const { loginInfo } = useContext(LoginInfoContext)
    const { admin, business, logged } = loginInfo
    useNavigate() /* makes the icons re-render after login */

    return (
        <Paper sx={{ paddingY: '10px' }} elevation={3}>
            <Box display="flex" justifyContent="center" alignItems="center" paddingBottom='10px'>
                <Stack direction="row" spacing={9}>
                    <FooterLink to="/about" icon={<InfoIcon color="action" />} text="About" />
                    {logged &&
                        <FooterLink to={`/favorite/${id}`} icon={<FavoriteIcon color="action" />} text="Favorite" />
                    }
                    {business &&
                        <FooterLink to={`/my cards/${id}`} icon={<RecentActorsIcon color="action" />} text="My Cards" />
                    }
                    {admin &&
                        <FooterLink to={`/sandbox/${id}`} icon={<AdminPanelSettingsIcon color="action" />} text="SandBox" />
                    }
                </Stack>
            </Box>
        </Paper>
    );
}


