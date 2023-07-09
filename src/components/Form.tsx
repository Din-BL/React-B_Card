import { Box, Typography, TextField, Container, Grid, Checkbox, FormControlLabel } from "@mui/material";
import BtnGroup from "./BtnGroup";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { capitalizeFirstLetter, inputData, pathUrl } from "../utils/helpers";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { BusinessCard, CheckField, FormField, FormProps, UserCard } from "../utils/types";
import 'react-toastify/dist/ReactToastify.css';
import LockOpenIcon from '@mui/icons-material/LockOpen';

function Form({ FormTitle, FormFields, FormSchema, CheckField, children, handleRegister, handleAdd, handleEdit }: FormProps) {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({ resolver: joiResolver(FormSchema), });
    const location = useLocation()
    const { id } = useParams();


    // type BusinessCards = {
    //     [key: string]: string;
    //     // Other properties of BusinessCard
    // };

    // const [initialValue, setInitialValue] = useState<BusinessCards>()

    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (id) {
    //             try {
    //                 const res = await getCard(id);
    //                 setInitialValue(res.data);
    //                 reset(res.data);
    //             } catch (error) {
    //                 toast.warning(e.response.data)
    //                 logout(navigate, business, setBusiness, setLogged)
    //             }
    //         }
    //     };
    //     fetchData();
    // }, []);

    // console.log(initialValue);


    const onSubmit = (data: any) => {
        if (CheckField) {
            const business = CheckField.checked
            handleRegister(data, business)
        } else if (pathUrl(`/add/`, location, id)) {
            handleAdd(data)
        } else {
            if (id) {
                handleEdit(id, data)
            }
        }
    };

    const handleReset = () => {
        reset();
        CheckField && CheckField.setChecked(false)
    }

    const childrenArray = React.Children.toArray(children);

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
                        return <Grid item xs={6} key={index}>
                            <TextField
                                {...register(inputData(field))}
                                sx={{ width: '100%' }}
                                required={field.required}
                                id={field.label}
                                label={capitalizeFirstLetter(field.label)}
                                type={field.type}
                                // defaultValue={initialValue?.[field.label]}
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










