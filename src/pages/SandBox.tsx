import { Box, Container } from "@mui/material";
import Title from "../components/Title";
import UserTable from "../components/Table";

function SandBox() {
    return (
        <Container>
            <Box component={'main'} sx={{ minHeight: '85dvh' }}>
                <Title main="SandBox Page" sub="Here you can find business cards from all catagories" />
                <UserTable />
            </Box>
        </Container>
    );
}

export default SandBox;