import { Box, Container, Fab, Stack } from "@mui/material";
import Title from "../components/Title";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from "react-router-dom";


function My_Cards() {
    const navigate = useNavigate()
    const { id } = useParams();
    return (
        <Container >
            <Box component={'main'} sx={{ minHeight: '85dvh' }}>
                <Title main="My Cards" sub="Here you can find business cards from all catagories" />
                <Stack direction="row" spacing={2} paddingBottom={3}>
                    {/* Favorite Cards */}
                </Stack>
                <Box sx={{ display: 'flex', justifyContent: 'end', pb: 12 }}>
                    <Fab color="primary" aria-label="add">
                        <AddIcon onClick={() => navigate(`/add card/${id}`)} />
                    </Fab>
                </Box>
            </Box>
        </Container>
    );
}

export default My_Cards;

