import * as React from 'react';
import { Box, IconButton, MenuItem, Menu } from '@mui/material';
import { AccountCircle, MeetingRoom, PersonRemove, Person } from '@mui/icons-material';
import { getData, removeData } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../utils/services';
import { toast } from 'react-toastify';
import { logout } from '../utils/helpers';
import { LoginInfoContext } from '../context/LoginInfo';
import { remove } from '../utils/sweetalert';

export default function UserIcon() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { setLoginInfo } = React.useContext(LoginInfoContext)
    const navigate = useNavigate()

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        logout(navigate, setLoginInfo)
        setAnchorEl(null);
    };

    const deleteAccount = () => {
        setAnchorEl(null);
        remove()
            .then((result) => {
                if (result.isConfirmed) {
                    deleteUser(getData('user', '_id'))
                        .then(() => {
                            toast.success(`${getData('user', 'userName')} has been removed`)
                            removeData(getData('user', 'userName'))
                            logout(navigate, setLoginInfo)
                            setAnchorEl(null);
                        })
                        .catch(e => {
                            const errMsg = e.response.data
                            toast.warning(errMsg)
                            errMsg.includes('expired') && logout(navigate, setLoginInfo)
                        })
                }
            })
    };

    const handleClose = () => setAnchorEl(null);

    return (
        <Box>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem ><Person sx={{ paddingRight: 1 }} />
                    {getData('user', 'userName')}
                </MenuItem>
                <MenuItem onClick={deleteAccount}><PersonRemove sx={{ paddingRight: 1 }} />
                    Remove
                </MenuItem>
                <MenuItem onClick={handleLogout}><MeetingRoom sx={{ paddingRight: 1 }} />
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
}
