import { Box, Container, useMediaQuery } from "@mui/material";
import Title from "../components/Title";
import { useUsers } from "../hooks/useUsers";
import Table from "../components/Table";

function SandBox() {
    const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
    const { users, deleteUser } = useUsers()
    const largeMsg = isSmallScreen ? '' : 'at B-Card'
    return (
        <Container maxWidth="md" >
            <Box component={'main'} minHeight='85dvh' >
                <Title main="User Management" sub={`Here you can manage all of the registered users ${largeMsg}`} />
                {users.length > 0 &&
                    <Table Users={users} userDeletion={deleteUser} />
                }
            </Box>
        </Container>
    );
}

export default SandBox;