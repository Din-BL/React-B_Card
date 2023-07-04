import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useState } from "react";
import { RegisterFields } from "../utils/fields";
import { registerSchema } from "../utils/schema";
import Form from "../components/Form";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../utils/services";
import { toast } from "react-toastify";
import { BusinessCard } from "../utils/types";

function Register() {
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handleRegister = (data: any, business: boolean) => {
        registerUser({ ...data, business })
            .then(() => {
                navigate('/login')
                toast.success('Successfully registered')
            })
            .catch(e => toast.error(e.response.data))
    }

    return (
        <Form FormTitle='Register'
            FormFields={RegisterFields}
            FormSchema={registerSchema}
            CheckField={{ checked, setChecked, handleChange }}
            handleRegister={handleRegister}>

            <FormControlLabel sx={{ marginLeft: 1, paddingTop: 1 }} control={
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />} label="Register as business" />

            <Typography paddingTop={3} paddingLeft={1} color={'text.secondary'}>
                Already have an account?
                <NavLink to={`/login`} style={{ paddingLeft: 5, textDecoration: 'none', color: 'black' }}>
                    Login now
                </NavLink>
            </Typography>
        </Form>

    )
}

export default Register;