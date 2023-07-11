import { Box, Container, Paper } from "@mui/material";
import BackGround from "../assets/B-Symbol.png"
import '../styles/App.css';
import { getData } from "../utils/localStorage";
import { useParams } from "react-router-dom";
import { BusinessCard } from "../utils/types";
import B_Form from "../components/Contact";
import { useEffect, useState } from "react";
import Contact from "../components/Contact";
import Typography from '@mui/material/Typography';
import { contactSchema } from "../utils/schema";
import { getCard } from "../utils/services";
import { defaultImage } from "../utils/helpers";
import { blue } from '@mui/material/colors';

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
                    <Typography component={'h1'} className="title" paddingLeft={1} sx={{ fontSize: "40px" }}>{isBusiness && businessInfo[0].title}</Typography>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <h1 className="title" style={{ fontSize: "20px" }}>{isBusiness && businessInfo[0].subtitle} </h1>
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