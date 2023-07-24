import { Box, Typography, TextField, InputAdornment, Container } from "@mui/material";
import { AccountCircle, LockOpen } from '@mui/icons-material';
import BtnGroup from "../components/BtnGroup";
import useFields from "../hooks/useFields";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/Theme";
import { useContext } from "react";

function Login() {
    const { fields, handleField, handleSubmit, resetFields } = useFields({ email: "", password: "" })
    const emailError = !fields.email.match(/^\S+@\S+\.\S+$/,) && fields.email.length > 0
    const passwordError = !fields.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d.*\d.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/) && fields.password.length > 0
    const isValid = () => (emailError || passwordError)
    const { themeMode } = useContext(ThemeContext)
    const textColor = themeMode === 'light' ? 'black' : 'white'

    return (
        <Container sx={{ minHeight: '85dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} maxWidth='sm' >
            <form onSubmit={handleSubmit} >
                <Box textAlign={'center'}><LockOpen fontSize="large" /></Box>
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
                    variant="outlined"
                    error={emailError}
                    helperText={emailError && 'Invalid email address format'}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        )
                    }}
                />
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
                    helperText={passwordError && "Password must contain at least one lowercase and uppercase letter, 4 numbers, one special character, and a minimum length of 8 characters"}
                    autoComplete="current-password"
                    variant="outlined"
                />
                <BtnGroup resetFields={resetFields} isValid={isValid} />
                <Typography paddingTop={3} paddingLeft={1} color={'text.secondary'}>
                    Dont have an account yet?
                    <NavLink to={`/register`} style={{ paddingLeft: 5, textDecoration: 'none', color: textColor }}>
                        Register now
                    </NavLink>
                </Typography>
            </form>
        </Container >
    );
}

export default Login;