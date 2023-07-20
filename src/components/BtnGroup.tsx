import { Box, ButtonGroup, Button } from "@mui/material";
import { Sync, Send } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { userId } from "../utils/helpers";
import { BtnGroupProps } from "../utils/types";

function BtnGroup({ resetFields, isValid = () => false }: BtnGroupProps) {
    const navigate = useNavigate()
    return (
        <Box marginTop={3} >
            <ButtonGroup sx={{ width: '100% ' }} >
                <Button onClick={() => navigate(`/home${userId()}`)} color='error' sx={{ width: '50%' }}>Cancel</Button>
                <Button onClick={resetFields} sx={{ width: '50%' }}>
                    <Sync />
                </Button>
            </ButtonGroup>
            <Button disabled={isValid()} type="submit" sx={{ width: '100%', marginTop: 1, padding: 1 }} variant="contained" endIcon={<Send />} >Submit</Button>
        </Box>
    );
}

export default BtnGroup;