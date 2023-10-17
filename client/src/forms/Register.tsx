import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { RegisterFields } from "../utils/fields";
import { registerSchema } from "../utils/schema";
import Form from "../components/Form";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../utils/services";
import { toast } from "react-toastify";
import { ThemeContext } from "../context/Theme";
import { UserCard, UserStatus } from "../utils/types";

function Register() {
    const [checked, setChecked] = useState<UserStatus>('User');
    const navigate = useNavigate()
    const { themeMode } = useContext(ThemeContext)
    const textColor = themeMode === 'light' ? 'black' : 'white'

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.value as UserStatus);
    };

    const handleRegister = <Type,>(data: Type) => {
        registerUser(data as UserCard)
            .then((info) => {
                navigate('/login')
                toast.success(`${info.data.userName} successfully registered`)
            })
            .catch(e => toast.error(e.response.data))
    }

    return (
        <Form FormTitle='Register'
            FormFields={RegisterFields}
            FormSchema={registerSchema}
            CheckField={{ checked, setChecked }}
            handleForm={handleRegister}>

            <FormControl sx={{ paddingLeft: 3, paddingTop: 3 }}>
                <FormLabel id="row-radio-buttons-group-label">Register as</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue={'User'}
                    value={checked}
                    onChange={handleChange}
                >
                    <FormControlLabel value="User" control={<Radio size="small" />} label="User" />
                    <FormControlLabel value="Business" control={<Radio size="small" />} label="Business" />
                    <FormControlLabel value="Admin" control={<Radio size="small" />} label="Admin" />
                </RadioGroup>
            </FormControl>

            <Typography paddingTop={3} paddingLeft={1} color={'text.secondary'}>
                Already have an account?
                <NavLink to={`/login`} style={{ paddingLeft: 5, textDecoration: 'none', color: textColor }}>
                    Login now
                </NavLink>
            </Typography>
        </Form>
    )
}

export default Register;