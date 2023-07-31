import { Container, Grid, TextField, Button, Typography, Fab, Box } from '@mui/material';
import { LocationOn, LocalPhone, Email, Language } from '@mui/icons-material';
import { ContactProps } from '../utils/types';
import { addressFormatter, capitalizeFirstLetter, inputData } from '../utils/helpers';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ThemeContext } from '../context/Theme';
import { blueGrey } from '@mui/material/colors';
import { ContactFields } from '../utils/fields';
import { submitAlert } from '../utils/sweetalert';
import { contactSchema } from '../utils/schema';

function Contact({ businessInfo }: ContactProps) {
    const { themeMode } = useContext(ThemeContext)
    const color = blueGrey[50];
    const backgroundColor = { backgroundColor: themeMode === 'light' ? color : '' }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: joiResolver(contactSchema) });

    function onSubmit() {
        reset()
        submitAlert()
    }

    const contactItems = [
        { icon: <LocationOn />, label: 'Address', value: addressFormatter(businessInfo.city, businessInfo.street, businessInfo.houseNumber, businessInfo.country) },
        { icon: <LocalPhone />, label: 'Phone', value: businessInfo.phone, link: `tel://${businessInfo.phone}` },
        { icon: <Email />, label: 'Email', value: businessInfo.email, link: `mailto:${businessInfo.email}` },
        { icon: <Language />, label: 'Website', value: businessInfo.web, link: businessInfo.web }
    ];

    return (
        <Box component={'section'} sx={{ backgroundColor }} >
            <Container>
                <Grid paddingTop={10} container >
                    <Grid item xs={12}>
                        <Grid container spacing={3} mb={5}>
                            <Grid item xs={12} md={7}>
                                <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
                                    <Typography color='primary' fontFamily={'math'} variant="h3" component="h2" mb={4}>Contact Us</Typography>
                                    <Grid container spacing={2}>
                                        {ContactFields.map((field, index) => {
                                            return <Grid item xs={12} md={field.width} key={index}>
                                                <TextField
                                                    {...register(inputData(field))}
                                                    required={field.required}
                                                    id={field.label}
                                                    label={capitalizeFirstLetter(field.label)}
                                                    type={field.type}
                                                    fullWidth
                                                    multiline={field.multiline}
                                                    rows={4}
                                                    error={!!errors[inputData(field)]}
                                                    helperText={errors[inputData(field)]?.message as string}
                                                />
                                            </Grid>
                                        })}
                                        <Grid item xs={12}>
                                            <Button type='submit' variant="contained" >Send Message</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <iframe style={{ height: '100%', width: '100%', border: '0' }} src={`https://www.google.com/maps/embed/v1/place?q=${businessInfo.street}+${businessInfo.houseNumber}+${businessInfo.city}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}></iframe>
                            </Grid>
                        </Grid>
                        <Grid paddingY={5} container>
                            {contactItems.map((item, index) => (
                                <Grid key={index} item xs={12} md={3}>
                                    <Box display={'flex'} justifyContent={'space-evenly'} flexDirection={'column'} alignItems={'center'}   >
                                        <Fab color="primary" aria-label="add">
                                            {item.icon}
                                        </Fab>
                                        <Box textAlign={'center'} paddingY={3}>
                                            <div>{item.label}</div> {item.link ? <a style={{ textDecoration: 'none' }} href={item.link}>{item.value}</a> : <Typography color="text.secondary" variant="body1" display="inline" > {item.value} </Typography>}
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Contact;
