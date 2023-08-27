import { Box, ButtonGroup, Button } from "@mui/material";
import { Sync, Send } from '@mui/icons-material';
import { useLocation, useNavigate } from "react-router-dom";
import { pathUrl, userId } from "../utils/helpers";
import { BtnGroupProps } from "../utils/types";

function BtnGroup({ resetFields, disableBtn }: BtnGroupProps) {
    const navigate = useNavigate()
    const location = useLocation()
    const cancelBtn = () => pathUrl('my-cards', location) ? navigate(`/my-cards${userId()}`) : navigate(`/home${userId()}`)
    const isDisabled = () => disableBtn ? disableBtn() : false

    return (
        <Box marginTop={3} >
            <ButtonGroup sx={{ width: '100% ' }} >
                <Button onClick={cancelBtn} color='error' sx={{ width: '50%' }}>Cancel</Button>
                <Button onClick={resetFields} sx={{ width: '50%' }}>
                    <Sync />
                </Button>
            </ButtonGroup>
            <Button disabled={isDisabled()} type="submit" sx={{ width: '100%', marginTop: 1, padding: 1 }} variant="contained" endIcon={<Send />} >Submit</Button>
        </Box>
    );
}

export default BtnGroup;