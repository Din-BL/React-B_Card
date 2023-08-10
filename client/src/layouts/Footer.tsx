import { Box, Paper, Typography, Grid, Container, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/B-Card.png'
import { userId } from '../utils/helpers';
import FooterLink from '../components/FooterLink';

export default function Footer() {
    const navigate = useNavigate();
    const isMediumScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));

    return (
        <Paper sx={{ paddingY: '10px' }} elevation={3}>
            <Container maxWidth='xl'>
                <Grid alignItems={'center'} container spacing={3}>
                    {isMediumScreen &&
                        <Grid textAlign={'start'} item xs={1.5}>
                            <Typography variant='caption' display={'block'} >Copyright &copy; </Typography>
                            <Typography variant='caption' display={'block'} > 2023 | Din_BL </Typography>
                        </Grid>
                    }
                    <Grid item xs={isMediumScreen ? 9 : 12}>
                        <Box display="flex" justifyContent="center" alignItems="center" paddingBottom='10px'>
                            <FooterLink />
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


