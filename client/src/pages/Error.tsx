import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import { userId } from '../utils/helpers';

function Error() {
    return (
        <Container maxWidth="sm"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                flexDirection: 'column',
                textAlign: 'center'
            }}
        >
            <Typography variant="h1" component="h1" sx={{ fontWeight: 'bold' }}>
                404
            </Typography>
            <Typography variant="h5" component="p" sx={{ color: 'error.main' }}>
                Opps! Page not found
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.25rem', mt: 2 }}>
                The page you’re looking for doesn’t exist
            </Typography>
            <Link to={`/home${userId()}`} style={{ textDecoration: 'none', marginTop: '1rem' }}>
                <Button variant="contained" color="primary">
                    Go Home
                </Button>
            </Link>
        </Container>
    );
}

export default Error;
