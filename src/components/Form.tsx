import { Box, Typography, TextField, Container, Grid, Checkbox, FormControlLabel } from "@mui/material";
import BtnGroup from "../components/BtnGroup";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { capitalizeFirstLetter, inputData } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { CheckField, FormField } from "../utils/types";
import { AnySchema } from "joi";


interface FormProps {
    FormTitle: string,
    FormFields: FormField[],
    FormSchema: AnySchema,
    CheckField?: CheckField,
    children?: ReactNode
}

function Form({ FormTitle, FormFields, FormSchema, CheckField, children }: FormProps) {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({ resolver: joiResolver(FormSchema), });
    const navigate = useNavigate()

    const onSubmit = (data: any) => {
        const checked = CheckField && CheckField.checked
        console.log({ ...data, checked })
        navigate('/login')
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
            </Box>
        </Container >
    )
}

export default Form;