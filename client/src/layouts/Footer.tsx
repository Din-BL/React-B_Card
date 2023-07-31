import { Box, Stack, Paper, Typography, Grid, Container, useMediaQuery } from '@mui/material';
import { Info, Favorite, RecentActors, AdminPanelSettings, ArrowBack, Email } from '@mui/icons-material';
import { getData } from '../utils/localStorage';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginInfoContext } from '../context/LoginInfo';
import { FooterLink } from '../components/FooterLink';
import logo from '../assets/B-Card.png'
import { userId } from '../utils/helpers';

export default function Footer() {
    const id = getData('user', '_id')
    const { loginInfo } = useContext(LoginInfoContext)
    const { admin, business, logged } = loginInfo
    const navigate = useNavigate();
    const goBack = () => navigate(-1)
    const isMediumScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
    const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

    return (
        <Paper sx={{ paddingY: '10px' }} elevation={3}>
            <Container maxWidth='xl'>
                <Grid alignItems={'center'} container spacing={3}>
                    {isMediumScreen &&
                        <Grid textAlign={'start'} item xs={1.5}>
                            <Typography variant='caption'>Copyright &copy; 2023 | Din </Typography>
                        </Grid>
                    }
                    <Grid item xs={isMediumScreen ? 9 : 12}>
                        <Box display="flex" justifyContent="center" alignItems="center" paddingBottom='10px'>
                            <Stack direction="row" spacing={{ xs: logged ? 2 : 4, sm: 5 }}>
                                {(isSmallScreen && logged) ? ""
                                    : <Typography onClick={goBack} display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{ cursor: 'pointer' }} color="text.secondary" variant={isSmallScreen ? 'caption' : 'body2'} component="h5">
                                        <ArrowBack />
                                        <span>Back</span>
                                    </Typography>
                                }
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
                                <FooterLink to="/contact" icon={<Email color="action" />} text="Contact Us" />
                            </Stack>
                        </Box>
                    </Grid>
                    {isMediumScreen &&
                        <Grid sx={{ cursor: 'pointer' }} onClick={() => navigate(`/home${userId()}`)} textAlign={'end'} item xs={1.5}>
                            <img src={logo} height={50} alt="Card-Logo" />
                        </Grid>
                    }
                </Grid>
            </Container>
        </Paper >
    );
}


