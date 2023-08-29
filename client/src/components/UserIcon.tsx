import * as React from 'react';
import { Box, IconButton, MenuItem, Menu, Divider, Avatar } from '@mui/material';
import { AccountCircle, MeetingRoom, PersonRemove, Person } from '@mui/icons-material';
import { getData, removeData } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../utils/services';
import { toast } from 'react-toastify';
import { errorMsg, logout } from '../utils/helpers';
import { LoginInfoContext } from '../context/LoginInfo';
import { removeAlert } from '../utils/sweetalert';

export default function UserIcon() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { setLoginInfo } = React.useContext(LoginInfoContext)
    const navigate = useNavigate()
    const userId = getData('userInfo', '_id')
    const userName = getData('userInfo', 'userName')
    const userImage = getData('userInfo', 'imageUrl')

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    const handleLogout = () => {
        logout(navigate, setLoginInfo)
        setAnchorEl(null);
    };

    const userInfo = () => {
        navigate(`user/${userId}`)
        setAnchorEl(null);
    };

    const deleteAccount = () => {
        setAnchorEl(null);
        removeAlert()
            .then((result) => {
                if (result.isConfirmed) {
                    deleteUser(userId)
                        .then(() => {
                            toast.success(`${userName} has been removed`)
                            removeData(userName)
                            handleLogout()
                        })
                        .catch(e => errorMsg(e, navigate, setLoginInfo))
                }
            })
    };

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
                {userImage ? <Avatar src={userImage} /> : <AccountCircle />}
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={userInfo} ><Person sx={{ paddingRight: 1 }} />
                    {userName}
                </MenuItem>
                <Divider />
                <MenuItem onClick={deleteAccount}><PersonRemove sx={{ paddingRight: 1 }} />
                    Remove
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}><MeetingRoom sx={{ paddingRight: 1 }} />
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
}
