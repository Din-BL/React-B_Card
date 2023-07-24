import { Box, Container } from "@mui/material";
import Title from "../components/Title";
import { useUsers } from "../hooks/useUsers";
import Table from "../components/Table";

function SandBox() {
    const { users, deleteUser } = useUsers()
    return (
        <Container maxWidth="md">
            <Box component={'main'} minHeight='85dvh' >
                <Title main="SandBox Page" sub="Here you can manage all of the registered users" />
                {users.length > 0 &&
                    <Table Users={users} userDeletion={deleteUser} />
                }
            </Box>
        </Container>
    );
}

export default SandBox;