import { Box, Typography, TextField, Container, Grid, Checkbox, FormControlLabel } from "@mui/material";
import BtnGroup from "../components/BtnGroup";
import { useState } from "react";
import { RegisterFields } from "../utils/formFields";


function Register() {
    const [checked, setChecked] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    return (
        <Container maxWidth='md' >
            <Box sx={{ minHeight: '85dvh', flexGrow: 1, paddingBottom: 5 }} component={'form'}>
                <Typography paddingY={3} textAlign={'center'} variant="h4" component={'h1'}>
                    Register
                </Typography>
                <Grid container spacing={2}>
                    {RegisterFields.map((field, index) => {
                        return <Grid item xs={6} key={index}>
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