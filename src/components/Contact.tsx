import '../styles/Contact.css';
import { Container, Grid, TextField, Button, Typography, Fab, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import { BusinessCard } from '../utils/types';
import { addressFormatter } from '../utils/helpers';
import AddIcon from '@mui/icons-material/Add';
import { blueGrey } from '@mui/material/colors';

// import '../styles/Business.css';


interface ContactProps {
    businessInfo: BusinessCard[]
}

function Contact({ businessInfo }: ContactProps) {
    return (
        <Grid paddingTop={10} container sx={{ backgroundColor: '#eceff1' }}>
            <Grid item xs={12}>
                <Grid container spacing={3} mb={5}>
                    <Grid item xs={12} md={7}>
                        <Box paddingLeft={5}>
                            <Typography color={'primary'} variant="h3" component="h3" mb={4}>Contact Us</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField label="Full Name" fullWidth placeholder="Name" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField label="Email Address" fullWidth placeholder="Email" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Subject" fullWidth placeholder="Subject" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Message" fullWidth multiline rows={4} placeholder="Message" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary">Send Message</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5} paddingRight={5}>
                        <iframe style={{ height: '100%', width: '100%', border: '0' }} src={`https://www.google.com/maps/embed/v1/place?q=${businessInfo[0].street}+${businessInfo[0].houseNumber}+${businessInfo[0].city}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}></iframe>
                    </Grid>
                </Grid>
                <Grid paddingY={10} container>
                    <Grid item xs={12} md={3}>
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}   >
                            <Fab color="primary" aria-label="add">
                                <LocationOnIcon />
                            </Fab>
                            <Typography textAlign={'center'} width={160} paddingTop={3}><span>Address:</span> {addressFormatter(businessInfo[0].city, businessInfo[0].street, businessInfo[0].houseNumber, businessInfo[0].country)}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}   >
                            <Fab color="primary" aria-label="add">
                                <LocalPhoneIcon />
                            </Fab>
                            <Typography paddingTop={3}><span>Phone:</span> <a href={`tel://${businessInfo[0].phone}`}>{businessInfo[0].phone}</a></Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}   >
                            <Fab color="primary" aria-label="add">
                                <EmailIcon />
                            </Fab>
                            <Typography paddingTop={3}><span>Email:</span> <a href={`mailto:${businessInfo[0].email}`}>{businessInfo[0].email}</a></Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}   >
                            <Fab color="primary" aria-label="add">
                                <LanguageIcon />
                            </Fab>
                            <Typography paddingTop={3}><span>Website</span> <a href={businessInfo[0].web}>{businessInfo[0].web}</a></Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}


export default Contact;