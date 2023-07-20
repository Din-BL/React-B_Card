import * as React from 'react';
import { Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import BasicSelect, { SelectChangeEvent } from '@mui/material/Select';
import { editStatus } from '../utils/services';
import { toast } from 'react-toastify';
import { logout, statusView } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { LoginInfoContext } from '../context/LoginInfo';
import { SelectProps } from '../utils/types';

export default function Select({ userStatus, userId, username }: SelectProps) {
    const [status, setStatus] = React.useState(userStatus);
    const navigate = useNavigate()
    const { setLoginInfo } = React.useContext(LoginInfoContext)

    const handleChange = (event: SelectChangeEvent) => {
        const status = event.target.value as string
        const value = status === 'User' ? false : true
        const userValue = { business: value }
        editStatus(userId, userValue)
            .then(() => {
                setStatus(status)
                toast.success(`${username} is now a ${status}`)
            })
            .catch(e => {
                const errMsg = e.response.data
                toast.error(errMsg)
                errMsg.includes('expired') && logout(navigate, setLoginInfo)
            })
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl size="small" fullWidth>
                <InputLabel id="select-label">{status}</InputLabel>
                <BasicSelect
                    labelId="select-label"
                    id="select"
                    label={status}
                    value={''}
                    onChange={handleChange}
                >
                    <MenuItem value={statusView(status)}>{statusView(status)}</MenuItem>
                </BasicSelect>
            </FormControl>
        </Box>
    );
}
