import { Box, Container } from "@mui/material";
import Title from "../components/Title";

function About() {
    return (
        <Container>
            <Box component={'main'} sx={{ minHeight: '85dvh' }}>
                <Title main="About Page" sub="Here you can find business cards from all catagories" />
            </Box>
        </Container>
    );
}

export default About;