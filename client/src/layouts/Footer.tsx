import { Box, Stack, Paper, Typography } from '@mui/material';
import { Info, Favorite, RecentActors, AdminPanelSettings, ArrowBack } from '@mui/icons-material';
import { getData } from '../utils/localStorage';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginInfoContext } from '../context/LoginInfo';
import { FooterLink } from '../components/FooterLink';

export default function Footer() {
    const id = getData('user', '_id')
    const { loginInfo } = useContext(LoginInfoContext)
    const { admin, business, logged } = loginInfo
    let navigate = useNavigate();
    const goBack = () => navigate(-1)

    return (
        <Paper sx={{ paddingY: '10px' }} elevation={3}>
            <Box display="flex" justifyContent="center" alignItems="center" paddingBottom='10px'>
                <Stack direction="row" spacing={{ xs: 4, sm: 5, md: 9 }}>
                    <Typography onClick={goBack} display={'flex'} flexDirection={'column'} alignItems={'center'} color="text.secondary" variant="body2" component="h5">
                        <ArrowBack />
                        <span>Back</span>
                    </Typography>
                    <FooterLink to="/about" icon={<Info color="action" />} text="About" />
                    {logged &&
                        <FooterLink to={`/favorite/${id}`} icon={<Favorite color="action" />} text="Favorite" />
                    }
                    {business &&
                        <FooterLink to={`/my-cards/${id}`} icon={<RecentActors color="action" />} text="My Cards" />
                    }
                    {admin &&
                        <FooterLink to={`/sandbox/${id}`} icon={<AdminPanelSettings color="action" />} text="SandBox" />
                    }
                </Stack>
            </Box>
        </Paper>
    );
}


