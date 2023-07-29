import { Alert, Box, Container, Fab, Grid } from "@mui/material";
import Title from "../components/Title";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from "react-router-dom";
import { BusinessCard } from "../utils/types";
import B_CARD from "../components/B_Card";
import { useContext } from "react";
import { DataContext } from "../context/Cards";

function MyCards() {
    const navigate = useNavigate()
    const { id } = useParams();
    const { data } = useContext(DataContext)

    return (
        <Container sx={{ paddingBottom: 3 }}>
            <Box component={'main'} flexGrow={1} minHeight='85dvh' >
                <Title main="My Cards" sub="Here you can manage all of your business cards" />
                {data.length === 0 && <Alert sx={{ marginBottom: 3 }} variant="outlined" severity="info">There are no business cards available</Alert>}
                <Grid container spacing={{ xs: 4, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 9, lg: 12 }}>
                    {data.map((card: BusinessCard) => (
                        <Grid key={card._id} item xs={4} sm={4} md={3} >
                            <B_CARD key={card._id} card={card} />
                        </Grid>
                    ))}
                </Grid>
                <Box display='flex' justifyContent='end' paddingBottom={12} paddingTop={3}>
                    <Fab color="primary" aria-label="add">
                        <AddIcon onClick={() => navigate(`/add/${id}`)} />
                    </Fab>
                </Box>
            </Box>
        </Container>
    );
}

export default MyCards;
