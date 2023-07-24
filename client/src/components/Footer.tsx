import { Box, Stack, Paper } from '@mui/material';
import { Info, Favorite, RecentActors, AdminPanelSettings } from '@mui/icons-material';
import { FooterLink } from './FooterLink'
import { getData } from '../utils/localStorage';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginInfoContext } from '../context/LoginInfo';

export default function Footer() {
    const id = getData('user', '_id')
    const { loginInfo } = useContext(LoginInfoContext)
    const { admin, business, logged } = loginInfo
    useNavigate() /* makes the icons re-render after login */

    return (
        <Paper sx={{ paddingY: '10px' }} elevation={3}>
            <Box display="flex" justifyContent="center" alignItems="center" paddingBottom='10px'>
                <Stack direction="row" spacing={{ xs: 4, sm: 5, md: 9 }}>
                    <FooterLink to="/about" icon={<Info color="action" />} text="About" />
                    {logged &&
                        <FooterLink to={`/favorite/${id}`} icon={<Favorite color="action" />} text="Favorite" />
                    }
                    {business &&
                        <FooterLink to={`/my cards/${id}`} icon={<RecentActors color="action" />} text="My Cards" />
                    }
                    {admin &&
                        <FooterLink to={`/sandbox/${id}`} icon={<AdminPanelSettings color="action" />} text="SandBox" />
                    }
                </Stack>
            </Box>
        </Paper>
    );
}


