import { Box, Typography, TextField, Container, Grid, Checkbox, FormControlLabel } from "@mui/material";
import BtnGroup from "./BtnGroup";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { capitalizeFirstLetter, inputData, pathUrl } from "../utils/helpers";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { BusinessCard, CheckField, FormField, FormProps, UserCard } from "../utils/types";
import { AnySchema } from "joi";
import { addCard, editCard, getCard, registerUser } from "../utils/services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { DataContext } from "../context/Cards";
import { getData } from "../utils/localStorage";

function Form({ FormTitle, FormFields, FormSchema, CheckField, children }: FormProps) {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({ resolver: joiResolver(FormSchema), });
    const navigate = useNavigate()
    const location = useLocation()
    const { id } = useParams();
    const { addData, editData } = useContext(DataContext)


    type BusinessCards = {
        [key: string]: string;
        // Other properties of BusinessCard
    };

    // const [initialValue, setInitialValue] = useState<BusinessCards>()

    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (id) {
    //             try {
    //                 const res = await getCard(id);
    //                 setInitialValue(res.data);
    //                 console.log(res.data);

    //                 reset(res.data);
    //             } catch (error) {
    //                 console.error(error);
    //             }
    //         }
    //     };
    //     fetchData();
    // }, [id]);

    const onSubmit = (data: any) => {
        if (CheckField) {
            const business = CheckField.checked
            registerUser({ ...data, business })
                .then(() => {
                    navigate('/login')
                    toast.success('Successfully registered')
                })
                .catch(e => toast.error(e.response.data))
        } else if (pathUrl(`/add/`, location, id)) {
            addCard(data)
                .then((info) => {
                    addData(info.data)
                    navigate(`/my cards/${id}`)
                    toast.success('Business added')
                })
                .catch(e => toast.error(e.response.data))
        } else {
            if (id) editCard(id, data)
                .then((info) => {
                    editData(id, info.data)
                    navigate(`/my cards/${getData('user', '_id')}`)
                    toast.success('Business added')
                })
        }
    };

    const handleReset = () => {
        reset();
        CheckField && CheckField.setChecked(false)
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
                        return <Grid item xs={6} key={index}>
                            <TextField
                                {...register(inputData(field))}
                                sx={{ width: '100%' }}
                                required={field.required}
                                id={field.label}
                                label={capitalizeFirstLetter(field.label)}
                                type={field.type}
                                // defaultValue={initialValue ? initialValue[field.label] : ""}
                                variant="outlined"
                                error={!!errors[inputData(field)]}
                                helperText={errors[inputData(field)]?.message as string}
                            />
                        </Grid>
                    })}
                    {children}
                </Grid>
                <BtnGroup resetFields={handleReset} />
                {pathUrl(`/register/`, location) &&
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