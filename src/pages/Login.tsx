import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import BtnGroup from "../components/BtnGroup";
import useFields from "../hooks/useFields";
import { LoginField } from "../utils/types";

function Login() {

    const { fields, handleField, handleSubmit, resetFields } = useFields<LoginField>({ email: "Example@email.com", password: "Password" })


    return (
        <Box component={'section'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85dvh' }}>
            <form onSubmit={handleSubmit} style={{ width: '50vw', height: '50vh' }} >
                <Typography paddingBottom={2} textAlign={'center'} variant="h4" component={'h1'}>
                    Login
                </Typography>

                <TextField
                    required
                    value={fields.email}
                    name="email"
                    onChange={handleField}
                    sx={{ width: '100%', marginTop: 1 }}
                    id="Email"
                    label="Email"
                    type="email"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined" />
                <TextField
                    required
                    value={fields.password}
                    name="password"
                    onChange={handleField}
                    sx={{ width: '100%', marginTop: 1 }}
                    id="Password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    helperText='Password must be at least 8 characters'
                    variant="outlined"
                />

                <BtnGroup resetFields={resetFields} />
            </form>
        </Box >
    );
}

export default Login;