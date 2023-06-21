import { Box, Typography, TextField, ButtonGroup, Button } from "@mui/material";
import SyncIcon from '@mui/icons-material/Sync';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router-dom";

interface HandleBtn {
    resetFields?: () => void;
    isValid?: () => boolean;
}

function BtnGroup({ resetFields, isValid = () => false }: HandleBtn) {
    const navigate = useNavigate()
    return (
        <Box sx={{ marginTop: 3 }}>
            <ButtonGroup sx={{ width: '100% ' }} >
                <Button onClick={() => navigate('/')} color='error' sx={{ width: '50%' }}>Cancel</Button>
                <Button onClick={resetFields} sx={{ width: '50%' }}>
                    <SyncIcon />
                </Button>
            </ButtonGroup>
            <Button disabled={isValid()} type="submit" sx={{ width: '100%', marginTop: 1, padding: 1 }} variant="contained" endIcon={<SendIcon />} >Submit</Button>
        </Box>
    );
}

export default BtnGroup;