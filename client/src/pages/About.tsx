import { Box, Card, CardMedia, CircularProgress, Paper, Typography, useMediaQuery } from "@mui/material";
import BackGround from "../assets/B-Symbol.png"
import { LoadingContext } from "../context/Loading";
import { useContext } from "react";
import { ContactProps } from "../utils/types";
import { defaultImage } from "../utils/helpers";

function About({ businessInfo }: ContactProps) {
    const { loading } = useContext(LoadingContext)
    const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
    const isAboutPage = businessInfo.title !== 'B-Card'

    return (
        <Box sx={{ flexDirection: { xs: 'column', md: 'row' } }} display={'flex'} alignItems={'center'} gap={2} justifyContent={'space-evenly'} component={'main'} minHeight='85dvh'>
            <div id="section_graphic">
                <img src={BackGround} alt="background" />
            </div>
            <article >
                {isAboutPage &&
                    <Typography variant={isSmallScreen ? 'h5' : 'h4'} paddingY={3} component={'h1'} color={'primary'} paddingLeft={1} >{businessInfo.title}</Typography>
                }
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography component={'h3'} className="title" color={'primary'} sx={{ fontSize: "20px" }}>{isAboutPage ? businessInfo.subtitle : 'About Us:'} </Typography>
                    <p>{businessInfo.description}</p>
                </Paper>
            </article>
            {loading ?
                <Box width={520} height='200px' display='flex' justifyContent='center' alignItems='center'>
                    <CircularProgress />
                </Box> :
                isAboutPage ?
                    <Card sx={{ width: isMediumScreen ? 400 : 'none' }}>
                        <CardMedia
                            component="img"
                            height="350"
                            image={defaultImage(businessInfo.imageUrl)}
                            alt={defaultImage(businessInfo.imageAlt)}
                        />
                    </Card> :
                    <figure style={{ maxWidth: 520 }}>
                        <img style={{ width: `100%` }} src={businessInfo.imageUrl} alt={businessInfo.imageAlt} />
                    </figure>
            }
        </Box>
    );
}

export default About;