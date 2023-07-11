import { Container, Grid, TextField, Button, Typography, Fab, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import { BusinessCard } from '../utils/types';
import { addressFormatter } from '../utils/helpers';
import { MouseEvent, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { AnySchema } from 'joi';
import Swal from 'sweetalert2';
import { ThemeContext } from '../context/Theme';
import { blueGrey } from '@mui/material/colors';

interface ContactProps {
    businessInfo: BusinessCard[],
    contactSchema: AnySchema,
}

function Contact({ businessInfo, contactSchema }: ContactProps) {

    const { themeMode } = useContext(ThemeContext)
    const color = blueGrey[50];
    const backgroundColor = { backgroundColor: themeMode === 'light' ? color : '' }

    function onSubmit() {
        reset()
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thank you!',
            text: 'Your submission has been sent',
            showConfirmButton: false,
            timer: 1500
        })
    }

    const { register, handleSubmit, reset, formState: { errors }, } = useForm({ resolver: joiResolver(contactSchema), });
    const contactItems = [
        { icon: <LocationOnIcon />, label: 'Address', value: addressFormatter(businessInfo[0].city, businessInfo[0].street, businessInfo[0].houseNumber, businessInfo[0].country) },
        { icon: <LocalPhoneIcon />, label: 'Phone', value: businessInfo[0].phone, link: `tel://${businessInfo[0].phone}` },
        { icon: <EmailIcon />, label: 'Email', value: businessInfo[0].email, link: `mailto:${businessInfo[0].email}` },
        { icon: <LanguageIcon />, label: 'Website', value: businessInfo[0].web, link: businessInfo[0].web }
    ];

    return (
        <Box component={'section'} sx={{ backgroundColor }} >
            <Container>
                <Grid paddingTop={10} container >
                    <Grid item xs={12}>
                        <Grid container spacing={3} mb={5}>
                            <Grid item xs={12} md={7}>
                                <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
                                    <Typography color='primary' variant="h3" component="h3" mb={4}>Contact Us</Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                {...register('fullName')}
                                                required
                                                label="Full name"
                                                fullWidth
                                                placeholder="Full name"
                                                error={!!errors['fullName']}
                                                helperText={errors['fullName']?.message as string}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                {...register('email')}
                                                required
                                                label="Email Address"
                                                fullWidth
                                                placeholder="Email"
                                                error={!!errors['email']}
                                                helperText={errors['email']?.message as string}
                                            />

                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                {...register('subject')}
                                                required
                                                label="Subject"
                                                fullWidth
                                                placeholder="Subject"
                                                error={!!errors['subject']}
                                                helperText={errors['subject']?.message as string}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                {...register('message')}
                                                required
                                                label="Message"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                placeholder="Message"
                                                error={!!errors['message']}
                                                helperText={errors['message']?.message as string}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button type='submit' variant="contained" >Send Message</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <iframe style={{ height: '100%', width: '100%', border: '0' }} src={`https://www.google.com/maps/embed/v1/place?q=${businessInfo[0].street}+${businessInfo[0].houseNumber}+${businessInfo[0].city}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}></iframe>
                            </Grid>
                        </Grid>
                        <Grid paddingY={5} container>
                            {contactItems.map((item, index) => (
                                <Grid key={index} item xs={12} md={3}>
                                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}   >
                                        <Fab color="primary" aria-label="add">
                                            {item.icon}
                                        </Fab>
                                        <Box textAlign={'center'} paddingTop={3}>
                                            <span>{item.label}:</span> {item.link ? <a style={{ textDecoration: 'none' }} href={item.link}>{item.value}</a> : <Typography color="text.secondary" variant="body1" display="inline" > {item.value} </Typography>}
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
