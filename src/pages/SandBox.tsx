import { Box, Container } from "@mui/material";
import Title from "../components/Title";
import UserTable from "../components/Table";
import { useUsers } from "../hooks/useUsers";

function SandBox() {
    const { users, deleteUser } = useUsers()

    return (
        <Container maxWidth="md">
            <Box component={'main'} minHeight='85dvh' >
                <Title main="SandBox Page" sub="Here you can find business cards from all catagories" />
                {users.length > 0 &&
                    <UserTable Users={users} userDeletion={deleteUser} />
                }
            </Box>
        </Container>
    );
}

export default SandBox;