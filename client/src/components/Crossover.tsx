import { Link, useLocation } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import { pathUrl, userId } from '../utils/helpers';
import maintenanceIcon from "../assets/technical-support.png"
import { CrossoverProps } from '../utils/types';

function Crossover({ main, sub }: CrossoverProps) {
    const location = useLocation()
    const maintenance = pathUrl('maintenance', location)

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
            {maintenance ?
                <img style={{ marginBottom: 10 }} width={200} src={maintenanceIcon} alt="" /> :
                <Typography variant="h1" component="h1" fontWeight='bold'> 404 </Typography>
            }
            <Typography color={maintenance ? 'primary' : 'error.main'} variant="h5" component="h1"  >
                {main}
            </Typography>
            <Typography paddingTop={1} variant={maintenance ? 'body2' : 'body2'} >
                {sub}
            </Typography>
            <Link to={`/home${userId()}`} style={{ textDecoration: 'none', marginTop: '1rem' }}>
                <Button variant="contained" color="primary">
                    Go Home
                </Button>
            </Link>
        </Container>
    );
}

export default Crossover;
