import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import BtnGroup from "../components/BtnGroup";
import useFields from "../hooks/useFields";
import { LoginField } from "../utils/types";
import { ToastContainer } from "react-toastify";

function Login() {
    const { fields, handleField, handleSubmit, resetFields } = useFields({ email: "", password: "" })
    const emailError = !fields.email.match(/^\S+@\S+\.\S+$/,) && fields.email.length > 0
    const passwordError = fields.password.length > 0 && fields.password.length < 8
    const isValid = () => (emailError || passwordError)

    return (
        <Box component={'section'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85dvh', }}>
            <form onSubmit={handleSubmit} style={{ width: '50vw', height: '50vh' }} >
                <Typography paddingBottom={2} textAlign={'center'} variant="h4" component={'h1'}>
                    Login
                </Typography>
                <TextField
                    required
                    placeholder="Example@email.com"
                    value={fields.email}
                    name="email"
                    onChange={handleField}
                    sx={{ width: '100%', marginTop: 1 }}
                    id="Email"
                    label="Email"
                    type="email"
                    error={emailError}
                    helperText={emailError && 'Invalid email address format'}
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
                    error={passwordError}
                    helperText={passwordError && 'Password must be at least 8 characters long'}
                    autoComplete="current-password"
                    variant="outlined"
                />
                <BtnGroup resetFields={resetFields} isValid={isValid} />
            </form>
        </Box >
    );
}

export default Login;