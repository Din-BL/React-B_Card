import '../styles/Contact.css';
import { Container, Grid, TextField, Button, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import { BusinessCard } from '../utils/types';
import { addressFormatter } from '../utils/helpers';
// import '../styles/Business.css';


interface ContactProps {
    businessInfo: BusinessCard[]
}

function Contact({ businessInfo }: ContactProps) {
    return (
        <section>
            <Container>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        <div className="wrapper">
                            <Grid container spacing={0} mb={5}>
                                <Grid item xs={12} md={7}>
                                    <div className="contact-wrap w-100 p-md-5 p-4">
                                        <Typography className='title' variant="h3" component="h3" mb={4}>Contact Us</Typography>
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
                                                <div className="submitting"></div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={5} className="d-flex align-items-stretch">
                                    <div id="map"></div>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} md={3}>
                                    <div className=" w-100 text-center">
                                        <div className="icon d-flex align-items-center justify-content-center">
                                            <LocationOnIcon />
                                        </div>
                                        <div className="text">
                                            <p><span>Address:</span> {addressFormatter(businessInfo[0].city, businessInfo[0].street, businessInfo[0].houseNumber)}</p>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <div className="dbox w-100 text-center">
                                        <div className="icon d-flex align-items-center justify-content-center">
                                            <LocalPhoneIcon />
                                        </div>
                                        <div className="text">
                                            <p><span>Phone:</span> <a href={`tel://${businessInfo[0].phone}`}>{businessInfo[0].phone}</a></p>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <div className="dbox w-50 text-center">
                                        <div className="icon d-flex align-items-center justify-content-center">
                                            <EmailIcon />
                                        </div>
                                        <div className="text">
                                            <p><span>Email:</span> <a href={`mailto:${businessInfo[0].email}`}>{businessInfo[0].email}</a></p>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <div className="dbox w-100 text-center">
                                        <div className="icon d-flex align-items-center justify-content-center">
                                            <LanguageIcon />
                                        </div>
                                        <div className="text">
                                            <p><span>Website</span> <a href={businessInfo[0].web}>{businessInfo[0].web}</a></p>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
}


export default Contact;