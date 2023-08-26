import * as React from 'react';
import { Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import BasicSelect, { SelectChangeEvent } from '@mui/material/Select';
import { editStatus } from '../utils/services';
import { toast } from 'react-toastify';
import { errorMsg, limitedRequests, statusView } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { LoginInfoContext } from '../context/LoginInfo';
import { SelectProps, UserStatus } from '../utils/types';
import Swal from 'sweetalert2';
import { editAlert, errorAlert } from '../utils/sweetalert';

export default function Select({ userStatus, userId, username }: SelectProps) {
    const [status, setStatus] = React.useState(userStatus);
    const { setLoginInfo } = React.useContext(LoginInfoContext)
    const navigate = useNavigate()

    const handleChange = (event: SelectChangeEvent) => {
        const status = event.target.value as UserStatus
        const value = status === 'User' ? false : true
        const userValue = { business: value }
        editAlert()
            .then((result) => {
                if (result.isConfirmed) {
                    if (limitedRequests(navigate)) {
                        errorAlert()
                    } else {
                        editStatus(userId, userValue)
                            .then(() => {
                                setStatus(status)
                                toast.success(`${username} is now a ${status}`)
                            })
                            .catch(e => errorMsg(e, navigate, setLoginInfo))
                    }
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
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
