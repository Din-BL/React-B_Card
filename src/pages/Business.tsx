import { Box, Container, Paper } from "@mui/material";
import BackGround from "../assets/B-Symbol.png"
import '../App.css';
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
        <Box component={'main'} sx={{ minHeight: '85dvh' }}>
            <section className="about_us">
                <div id="section_graphic">
                    <img src={BackGround} alt="image background" />
                </div>
                <article >
                    <Typography component={'h1'} className="title" color={'primary'} paddingLeft={1} sx={{ fontSize: "40px" }}>{isBusiness && businessInfo[0].title}</Typography>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography component={'h3'} className="title" color={'primary'} sx={{ fontSize: "20px" }}>{isBusiness && businessInfo[0].subtitle} </Typography>
                        <p>{isBusiness && businessInfo[0].description}</p>
                    </Paper>
                </article>
                {isBusiness &&
                    <figure>
                        <img style={{ borderRadius: '8px' }} src={defaultImage(businessInfo[0].imageUrl)} alt="main-page image" />
                    </figure>
                }
            </section>
            {isBusiness &&
                <Contact businessInfo={businessInfo} contactSchema={contactSchema} />
            }
        </Box>
    );
}

export default Business;