import { Box, Typography, TextField, Container, Grid, Checkbox, FormControlLabel } from "@mui/material";
import BtnGroup from "../components/BtnGroup";
import { useState } from "react";

const RegisterFields = [
    {
        required: true,
        label: 'First Name',
        type: 'text'
    },

    {
        required: false,
        label: 'Middle Name',
        type: 'text'
    },
    {
        required: true,
        label: 'Last Name',
        type: 'text'
    },
    {
        required: true,
        label: 'Phone',
        type: 'number'
    },
    {
        required: true,
        label: 'Email',
        type: 'email'
    },
    {
        required: true,
        label: 'Password',
        type: 'password'
    },
    {
        required: false,
        label: 'Image url',
        type: 'url'
    },
    {
        required: false,
        label: 'Image alt',
        type: 'text'
    },
    {
        required: false,
        label: 'State',
        type: 'text'
    },
    {
        required: true,
        label: 'Country',
        type: 'text'
    },
    {
        required: true,
        label: 'City',
        type: 'text'
    },
    {
        required: true,
        label: 'Street',
        type: 'text'
    },
    {
        required: true,
        label: 'House number',
        type: 'text'
    },
    {
        required: false,
        label: 'Zip',
        type: 'text'
    },

]

function Register() {
    const [checked, setChecked] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    return (
        <Container >
            <Box sx={{ minHeight: '85dvh', flexGrow: 1, paddingBottom: 5 }} component={'form'}>
                <Typography paddingY={3} textAlign={'center'} variant="h4" component={'h1'}>
                    Register
                </Typography>
                <Grid container spacing={2}>
                    {RegisterFields.map((field) => {
                        return <Grid item xs={6}>
                            <TextField
                                sx={{ width: '100%' }}
                                required={field.required}
                                id={field.label}
                                label={field.label}
                                type={field.type}
                                variant="outlined" />
                        </Grid>
                    })}
                    <FormControlLabel sx={{ marginLeft: 1, paddingTop: 1 }} control={
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />} label="Register as business" />
                </Grid>
                <BtnGroup />
            </Box>
        </Container>
    )
}

export default Register;