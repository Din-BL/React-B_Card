import { Box, Typography, TextField, Container, Grid, Checkbox, FormControlLabel } from "@mui/material";
import BtnGroup from "../components/BtnGroup";
import { useState } from "react";
import { RegisterFields } from "../utils/fields";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { RegisterField } from "../utils/types";
import registerSchema from "../utils/schema";
import { capitalizeFirstLetter, inputData } from "../utils/helpers";

function Register() {
    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: joiResolver(registerSchema), });

    const [checked, setChecked] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const onSubmit = (data: any) => console.log(data);

    return (
        <Container maxWidth='md' >
            <Box onSubmit={handleSubmit(onSubmit)}
                sx={{ minHeight: '85dvh', flexGrow: 1, paddingBottom: 5 }} component={'form'}>
                <Typography paddingY={3} textAlign={'center'} variant="h4" component={'h1'}>
                    Register
                </Typography>
                <Grid container spacing={2}>
                    {RegisterFields.map((field, index) => {
                        return <Grid item xs={6} key={index}>
                            <TextField
                                {...register(inputData(field))}
                                sx={{ width: '100%' }}
                                required={field.required}
                                id={field.label}
                                label={capitalizeFirstLetter(field.label)}
                                type={field.type}
                                variant="outlined"
                                error={!!errors[inputData(field)]}
                                helperText={errors[inputData(field)]?.message as string}
                            />
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