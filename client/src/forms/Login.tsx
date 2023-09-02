import { Box, Typography, TextField, InputAdornment, Container, Button, IconButton } from "@mui/material";
import { AccountCircle, LockOpen, Visibility, VisibilityOff } from '@mui/icons-material';
import BtnGroup from "../components/BtnGroup";
import useFields from "../hooks/useFields";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/Theme";
import { useContext, useState } from "react";
import { emailAlert } from "../utils/sweetalert";

function Login() {
    const { fields, handleField, handleSubmit, resetFields } = useFields({ email: "", password: "" })
    const emailError = !fields.email.match(/^\S+@\S+\.\S+$/,) && fields.email.length > 0
    const passwordError = !fields.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9].*[0-9].*[0-9].*[0-9])(?=.*[#$@!%&*?_-]).{8,30}$/) && fields.password.length > 0
    const { themeMode } = useContext(ThemeContext)
    const textColor = themeMode === 'light' ? 'black' : 'white'
    const [showPassword, setShowPassword] = useState(false);
    const disableBtn = () => emailError || passwordError ? true : false

    return (
        <Container sx={{ minHeight: '85dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} maxWidth='sm' >
            <form onSubmit={handleSubmit} >
                <Box textAlign={'center'}><LockOpen fontSize="large" /></Box>
                <Typography paddingBottom={2} textAlign={'center'} variant="h4" component={'h1'}>
                    Login
                </Typography>
                <TextField
                    required
                    autoComplete="off"
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
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    error={passwordError}
                    helperText={passwordError && "Invalid password format"}
                    autoComplete="current-password"
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Button onClick={emailAlert} sx={{ fontSize: 11, textTransform: 'none' }} size="small" >Forgot password?</Button>
                <BtnGroup resetFields={resetFields} disableBtn={disableBtn} />
                <Typography paddingTop={3} paddingLeft={1} color={'text.secondary'}>
                    Don't have an account yet?
                    <NavLink to={`/register`} style={{ paddingLeft: 5, textDecoration: 'none', color: textColor }}>
                        Register now
                    </NavLink>
                </Typography>
            </form>
        </Container >
    );
}

export default Login;