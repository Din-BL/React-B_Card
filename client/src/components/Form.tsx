import { Box, Typography, TextField, Container, Grid } from "@mui/material";
import BtnGroup from "./BtnGroup";
import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { capitalizeFirstLetter, inputData, isDisabled } from "../utils/helpers";
import { FormData, FormProps } from "../utils/types";
import LockOpenIcon from '@mui/icons-material/LockOpen';

function Form({ FormTitle, FormFields, FormSchema, CheckField, children, handleRegister, handleForm, initialValue }: FormProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: joiResolver(FormSchema) });
    const childrenArray = React.Children.toArray(children);

    const onSubmit = (data: FormData) => {
        if (CheckField) {
            let admin = false
            let business = CheckField.checked === 'Business'
            if (CheckField.checked === 'Admin') {
                admin = true
                business = true
            }
            handleRegister && handleRegister(data, business, admin)
        } else {
            handleForm && handleForm(data)
        }
    };

    const handleReset = () => {
        reset();
        CheckField && CheckField.setChecked('User')
    }

    return (
        <Container maxWidth='md' >
            <Box onSubmit={handleSubmit(onSubmit)}

                minHeight='85dvh' flexGrow={1} paddingBottom={5} component={'form'}>
                <Box paddingTop={5} textAlign={'center'}><LockOpenIcon fontSize="large" /></Box>
                <Typography paddingBottom={5} textAlign={'center'} variant="h4" component={'h1'}>
                    {FormTitle}
                </Typography>
                <Grid container spacing={2}>
                    {FormFields.map((field, index) => {
                        return <Grid item xs={12} sm={6} key={index}>
                            <TextField
                                {...register(inputData(field))}
                                sx={{ width: '100%' }}
                                required={field.required}
                                id={field.label}
                                label={capitalizeFirstLetter(field.label)}
                                type={field.type}
                                defaultValue={initialValue?.[inputData(field)]}
                                disabled={isDisabled(initialValue, field.label)}
                                variant="outlined"
                                error={!!(errors as any)[inputData(field)]}
                                helperText={(errors as any)[inputData(field)]?.message as string}
                            />
                        </Grid>
                    })}
                    {childrenArray[0]}
                </Grid>
                <BtnGroup resetFields={handleReset} />
                {childrenArray[1]}
            </Box>
        </Container >
    )
}

export default Form;










