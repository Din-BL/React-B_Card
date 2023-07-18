import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import BasicSelect, { SelectChangeEvent } from '@mui/material/Select';
import { UserStatus } from '../utils/types';
import { updateUser } from '../utils/services';
import { toast } from 'react-toastify';
import { logout } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { LoginInfoContext } from '../context/LoginInfo';

interface SelectProps {
    userStatus: string,
    userId: string
}

export default function Select({ userStatus, userId }: SelectProps) {
    const [status, setStatus] = React.useState(userStatus);
    const navigate = useNavigate()
    const { setLoginInfo } = React.useContext(LoginInfoContext)

    const handleChange = (event: SelectChangeEvent) => {
        const status = event.target.value as string
        const value = status === 'User' ? false : true
        const userValue = { business: value }
        updateUser(userId, userValue)
            .then(() => {
                setStatus(status)
                toast.success('Status been updated!')
            })
            .catch(e => {
                const errMsg = e.response.data
                toast.error(errMsg)
                errMsg.includes('expired') && logout(navigate, setLoginInfo)
            })
    };

    function statusView(userStatus: string) {
        return userStatus === 'Business' ? 'User' : 'Business'
    }

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
