import { Box, Typography, TextField, ButtonGroup, Button } from "@mui/material";
import SyncIcon from '@mui/icons-material/Sync';
import BtnGroup from "../components/BtnGroup";

function Login() {
    return (
        <Box component={'section'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85dvh' }}>
            <Box component={'form'} sx={{ width: '50vw', height: '50vh' }} >
                <Typography paddingBottom={2} textAlign={'center'} variant="h4" component={'h1'}>
                    Login
                </Typography>

                <TextField
                    required
                    sx={{ width: '100%', marginTop: 1 }}
                    id="Email"
                    label="Email"
                    type="email"
                    defaultValue='Example@gmail.com'
                    variant="outlined" />
                <TextField
                    required
                    sx={{ width: '100%', marginTop: 1 }}
                    id="Password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    defaultValue='Password'
                    helperText='Password must be at least 8 characters'
                    variant="outlined"
                />

                <BtnGroup />
            </Box>
        </Box >
    );
}

export default Login;