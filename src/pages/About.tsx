import { Box } from "@mui/material";
import FormValid from "./FormValid";

function About() {
    return (
        <Box component={'main'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85dvh' }}>
            <FormValid />
        </Box>
    );
}

export default About;