import { Box, Container } from "@mui/material";
import Pic from "../assets/Business.png"
import BackGround from "../assets/B-Symbol.png"
import '../styles/About.css';

function About() {
    return (
        <Box component={'main'} sx={{ minHeight: '85dvh' }}>
            <section className="about_us">
                <div id="section_graphic">
                    <img src={BackGround} alt="image background" />
                </div>
                <article >
                    <h1 className="title" style={{ fontSize: "25px" }}> About Page: </h1>
                    <p>B-Card is a business management platform that helps entrepreneurs promote their businesses effectively. Our digital business cards provide exposure and detailed information to potential customers.</p>
                    <br />
                    <h2 className="title" style={{ fontSize: "20px" }}>  About Us:</h2>
                    <p> B-Card, founded in 2005, is a leading company in business management. We empower entrepreneurs by simplifying business management and maximizing their reach. Our platform connects businesses with customers, creating opportunities for success.</p>
                </article>
                <figure>
                    <img src={Pic} alt="main-page image" />
                </figure>
            </section>
        </Box>
    );
}

export default About;