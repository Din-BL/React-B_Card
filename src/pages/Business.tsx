import { Box, Container, Paper } from "@mui/material";
import Pic from "../assets/Business.jpg"
import BackGround from "../assets/B-Symbol.png"
import '../styles/Business.css';
import { getData } from "../utils/localStorage";
import { useParams } from "react-router-dom";
import { BusinessCard } from "../utils/types";
import B_Form from "../components/Contact";
import { useEffect } from "react";
import Contact from "../components/Contact";
import Typography from '@mui/material/Typography';

function Business() {
    const { id } = useParams()
    let businessInfo: BusinessCard[] = getData('defaultCards').filter((business: BusinessCard) => business._id === id)

    return (
        <Box component={'main'} sx={{ minHeight: '85dvh' }}>
            <section className="about_us">
                <div id="section_graphic">
                    <img src={BackGround} alt="image background" />
                </div>
                <article >
                    <Typography component={'h1'} className="title" paddingLeft={1} sx={{ fontSize: "40px" }}>{businessInfo[0].title}</Typography>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <h1 className="title" style={{ fontSize: "25px" }}> About Us: </h1>
                        <p>{businessInfo[0].description}</p>
                    </Paper>
                </article>
                <figure>
                    <img src={businessInfo[0].imageUrl} alt="main-page image" />
                </figure>
            </section>
            <Contact businessInfo={businessInfo} />
        </Box>
    );
}

export default Business;