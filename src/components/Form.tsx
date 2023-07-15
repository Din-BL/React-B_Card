import { Box, Typography, TextField, Container, Grid } from "@mui/material";
import BtnGroup from "./BtnGroup";
import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { capitalizeFirstLetter, inputData, pathUrl } from "../utils/helpers";
import { useLocation, useParams } from "react-router-dom";
import { FormProps } from "../utils/types";
import LockOpenIcon from '@mui/icons-material/LockOpen';

function Form({ FormTitle, FormFields, FormSchema, CheckField, children, handleRegister, handleAdd, handleEdit, initialValue }: FormProps) {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({ resolver: joiResolver(FormSchema), });
    const childrenArray = React.Children.toArray(children);
    const location = useLocation()
    const { id } = useParams();

    const onSubmit = (data: any) => {
        if (CheckField) {
            let admin = false
            let business = CheckField.checked === 'business'
            if (CheckField.checked === 'admin') {
                admin = true
                business = true
            }
            handleRegister(data, business, admin)
        } else if (pathUrl(`add`, location)) {
            handleAdd(data)
        } else {
            if (id) {
                handleEdit(id, data)
            }
        }
    };

    const handleReset = () => {
        reset();
        CheckField && CheckField.setChecked('user')
    }

    return (
        <Container maxWidth='md' >
            <Box onSubmit={handleSubmit(onSubmit)}
                sx={{ minHeight: '85dvh', flexGrow: 1, paddingBottom: 5 }} component={'form'}>
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
                                variant="outlined"
                                error={!!errors[inputData(field)]}
                                helperText={errors[inputData(field)]?.message as string}
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










