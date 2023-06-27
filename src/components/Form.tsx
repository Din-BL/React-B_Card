import { Box, Typography, TextField, Container, Grid, Checkbox, FormControlLabel } from "@mui/material";
import BtnGroup from "../components/BtnGroup";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { capitalizeFirstLetter, inputData } from "../utils/helpers";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BusinessCard, CheckField, FormField, FormProps, UserCard } from "../utils/types";
import { AnySchema } from "joi";
import { registerUser } from "../utils/services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form({ FormTitle, FormFields, FormSchema, CheckField, children }: FormProps) {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({ resolver: joiResolver(FormSchema), });
    const navigate = useNavigate()
    const location = useLocation()

    const onSubmit = (data: any) => {
        const business = CheckField && CheckField.checked
        registerUser({ ...data, business })
            .then(() => {
                navigate('/login')
                toast.success('Successfully registered')
            })
            .catch(e => toast.error(e.response.data))
    };

    const handleReset = () => {
        reset();
        CheckField && CheckField.setChecked(false)
    }

    return (
        <Container maxWidth='md' >
            <Box onSubmit={handleSubmit(onSubmit)}
                sx={{ minHeight: '85dvh', flexGrow: 1, paddingBottom: 5 }} component={'form'}>
                <Typography paddingY={4} textAlign={'center'} variant="h4" component={'h1'}>
                    {FormTitle}
                </Typography>
                <Grid container spacing={2}>
                    {FormFields.map((field, index) => {
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
                    {children}
                </Grid>
                <BtnGroup resetFields={handleReset} />
                {location.pathname === '/register' &&
                    <Typography paddingTop={3} paddingLeft={1} color={'text.secondary'}>
                        Already have an account?
                        <NavLink to={`/login`} style={{ paddingLeft: 5, textDecoration: 'none', color: 'black' }}>
                            Login now
                        </NavLink>
                    </Typography>}
            </Box>
        </Container >
    )
}

export default Form;