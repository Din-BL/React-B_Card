import * as React from 'react';
import { Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import BasicSelect, { SelectChangeEvent } from '@mui/material/Select';
import { editStatus } from '../utils/services';
import { toast } from 'react-toastify';
import { errorMsg, filteredCards, limitedRequests, removeDefaultCard, statusView, uniqueFavorites, usernameStorageSync } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { LoginInfoContext } from '../context/LoginInfo';
import { SelectProps, UserStatus } from '../utils/types';
import Swal from 'sweetalert2';
import { editAlert, errorAlert } from '../utils/sweetalert';
import { getData, setData } from '../utils/localStorage';
import { AllCardsContext, FavoriteContext } from '../context/Cards';

export default function Select({ userStatus, userId, username }: SelectProps) {
    const [status, setStatus] = React.useState(userStatus);
    const { setLoginInfo } = React.useContext(LoginInfoContext)
    const { setFavorite } = React.useContext(FavoriteContext)
    const { setCards } = React.useContext(AllCardsContext)
    const favoriteCards = getData('favoriteCards')
    const navigate = useNavigate()

    const handleChange = (event: SelectChangeEvent) => {
        const status = event.target.value as UserStatus
        const value = status === 'User' ? false : true
        const userValue = { business: value }
        editAlert(value, username)
            .then((result) => {
                if (result.isConfirmed) {
                    if (limitedRequests(navigate)) {
                        errorAlert()
                    } else {
                        editStatus(userId, userValue)
                            .then((info) => {
                                if (!value) {
                                    if (favoriteCards) {
                                        setData('favoriteCards', filteredCards(favoriteCards, info.data))
                                        setFavorite(uniqueFavorites())
                                        const user = getData(username) || []
                                        setData(username, filteredCards(user, info.data))
                                        usernameStorageSync(info.data)
                                    } removeDefaultCard(info.data, setCards)
                                } setStatus(status)
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
