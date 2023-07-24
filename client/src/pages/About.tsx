import { Box, Paper, Typography } from "@mui/material";
import Pic from "../assets/Business.png"
import BackGround from "../assets/B-Symbol.png"

function About() {
    return (
        <Box sx={{ flexDirection: { xs: 'column', md: 'row' } }} display={'flex'} alignItems={'center'} justifyContent={'space-evenly'} component={'main'} minHeight='85dvh'>
            <div id="section_graphic">
                <img src={BackGround} alt="image background" />
            </div>
            <article >
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography className="title" color={'primary'} sx={{ fontSize: "25px" }}> About Us: </Typography>
                    <p>B-Card is a leading business management platform empowering entrepreneurs to effectively promote their businesses.<br /> Our digital business cards provide exposure and detailed information to potential customers, maximizing reach and creating opportunities for success.
                        <br />Founded in 2005, we've been simplifying operations and connecting businesses with customers.<br /> Headquartered in Tel-Aviv, our dedicated team works passionately to enhance our platform and support your entrepreneurial journey.
                        <br /> Join B-Card to unlock your business's potential, together let's shape a future where dreams become reality and businesses thrive.</p>
                </Paper>
            </article>
            <figure style={{ maxWidth: 520 }}>
                <img style={{ width: `100%` }} src={Pic} alt="main-page image" />
            </figure>
        </Box>
    );
}

export default About;