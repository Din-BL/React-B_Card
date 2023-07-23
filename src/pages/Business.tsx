import { Box, Card, CardMedia, Paper, useMediaQuery, Typography } from "@mui/material";
import BackGround from "../assets/B-Symbol.png"
import { getData } from "../utils/localStorage";
import { useParams } from "react-router-dom";
import { BusinessCard } from "../utils/types";
import Contact from "../components/Contact";
import { contactSchema } from "../utils/schema";
import { defaultImage } from "../utils/helpers";
import useCard from "../hooks/useCard";

function Business() {
    const { id } = useParams()
    const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
    const data = { ...getData('*defaultCards*').find((business: BusinessCard) => business._id === id) };
    const card = useCard('business', data)
    const isBusiness = card?._id

    return (
        <Box>
            <Box sx={{ flexDirection: { xs: 'column', md: 'row' } }} display={'flex'} alignItems={'center'} gap={2} justifyContent={'space-evenly'} component={'main'} minHeight='85dvh'>
                <div id="section_graphic">
                    <img src={BackGround} alt="image background" />
                </div>
                <article >
                    <Typography variant={isSmallScreen ? 'h5' : 'h4'} paddingY={3} component={'h1'} color={'primary'} paddingLeft={1} >{isBusiness && card.title}</Typography>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography component={'h3'} className="title" color={'primary'} sx={{ fontSize: "20px" }}>{isBusiness && card.subtitle} </Typography>
                        <p>{isBusiness && card.description}</p>
                    </Paper>
                </article>
                {isBusiness &&
                    <Card >
                        <CardMedia
                            component="img"
                            height="350"
                            image={defaultImage(card.imageUrl)}
                            alt={defaultImage(card.imageAlt)}
                        />
                    </Card>
                }
            </Box>
            {isBusiness &&
                <Contact businessInfo={card} contactSchema={contactSchema} />
            }
        </Box>
    );
}

export default Business;