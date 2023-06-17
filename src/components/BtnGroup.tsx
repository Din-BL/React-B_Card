import { Box, Typography, TextField, ButtonGroup, Button } from "@mui/material";
import SyncIcon from '@mui/icons-material/Sync';

function BtnGroup() {
    return (
        <Box sx={{ marginTop: 3 }}>
            <ButtonGroup sx={{ width: '100% ' }} >
                <Button color='error' sx={{ width: '50%' }}>Cancel</Button>
                <Button sx={{ width: '50%' }}>
                    <SyncIcon />
                </Button>
            </ButtonGroup>
            <Button sx={{ width: '100%', marginTop: 1, padding: 1 }} variant="contained" >Submit</Button>
        </Box>
    );
}

export default BtnGroup;