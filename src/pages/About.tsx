import { Box, Container } from "@mui/material";
import Pic from "../assets/about_us_picture.png"
import BackGround from "../assets/R_graphic_element.svg"
import Business from "../assets/pexels-fauxels-3184405.jpg"

function About() {
    return (
        <Box component={'main'} sx={{ minHeight: '85dvh' }}>
            <section className="about_us">
                <div id="section_graphic">
                    <img src={BackGround} alt="" />
                </div>
                <article>
                    <h1>Our story</h1>
                    <p> B-Card is a business management platform that assists private entrepreneurs in getting exposure that can contribute to their business. Our system is designed to provide every user with a digital business card, which can be used to promote their business and provide more details to potential customers.</p>
                    <br />
                    <p> About Us:
                        B-Card, founded in 2005, is a leading company in the business management industry. We have been dedicated to helping entrepreneurs succeed by providing them with innovative tools and solutions to promote their businesses effectively. Over the years, we have built a strong reputation for our commitment to excellence and customer satisfaction. Our mission is to empower entrepreneurs by providing them with a platform that simplifies business management and maximizes their reach. At B-Card, we understand the importance of connecting businesses with potential customers. Our platform is designed to bridge this gap and create opportunities for entrepreneurs to showcase their products and services to a wider audience.</p>
                </article>
                <figure>
                    <img src={Pic} alt="" />
                </figure>
            </section>
        </Box>
    );
}

export default About;