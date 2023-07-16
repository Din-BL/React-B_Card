import { Box, Card, CardMedia, Container, Paper, useMediaQuery } from "@mui/material";
import BackGround from "../assets/B-Symbol.png"
import { getData } from "../utils/localStorage";
import { useParams } from "react-router-dom";
import { BusinessCard } from "../utils/types";
import { useEffect, useState } from "react";
import Contact from "../components/Contact";
import Typography from '@mui/material/Typography';
import { contactSchema } from "../utils/schema";
import { getCard } from "../utils/services";
import { defaultImage } from "../utils/helpers";

function Business() {
    const [businessInfo, setBusinessInfo] = useState<BusinessCard[]>([])
    const { id } = useParams()
    const isBusiness = businessInfo.length > 0
    const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
    let data: BusinessCard[] = getData('defaultCards').filter((business: BusinessCard) => business._id === id)

    useEffect(() => {
        if (data.length === 0) {
            id && getCard(id)
                .then((card) => setBusinessInfo([card.data]))
                .catch(error => console.log(error))
        } else {
            setBusinessInfo(data)
        }
    }, [])

    return (
        <Box>
            <Box sx={{ flexDirection: { xs: 'column', md: 'row' } }} display={'flex'} alignItems={'center'} gap={2} justifyContent={'space-evenly'} component={'main'} minHeight='85dvh'>
                <div id="section_graphic">
                    <img src={BackGround} alt="image background" />
                </div>
                <article >
                    <Typography variant={isSmallScreen ? 'h5' : 'h4'} paddingY={3} component={'h1'} color={'primary'} paddingLeft={1} >{isBusiness && businessInfo[0].title}</Typography>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography component={'h3'} className="title" color={'primary'} sx={{ fontSize: "20px" }}>{isBusiness && businessInfo[0].subtitle} </Typography>
                        <p>{isBusiness && businessInfo[0].description}</p>
                    </Paper>
                </article>
                {isBusiness &&
                    <Card >
                        <CardMedia
                            component="img"
                            height="350"
                            image={defaultImage(businessInfo[0].imageUrl)}
                            alt={defaultImage(businessInfo[0].imageAlt)}
                        />
                    </Card>
                }
            </Box>
            {isBusiness &&
                <Contact businessInfo={businessInfo} contactSchema={contactSchema} />
            }
        </Box>
    );
}

export default Business;