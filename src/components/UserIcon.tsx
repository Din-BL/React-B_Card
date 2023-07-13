import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { getData, removeData } from '../utils/localStorage';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUser } from '../utils/services';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonIcon from '@mui/icons-material/Person';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { toast } from 'react-toastify';
import { logout } from '../utils/helpers';
import { LoginInfoContext } from '../context/LoginInfo';

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
        deleteUser(getData('user', '_id'))
            .then(() => {
                toast.success(`${getData('user', 'userName')} has been removed`)
                removeData(getData('user', 'userName'))
                logout(navigate, setLoginInfo)
                setAnchorEl(null);
            })
            .catch(e => toast.error(e.response.data))
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
                <MenuItem ><PersonIcon sx={{ paddingRight: 1 }} />
                    {getData('user', 'userName')}
                </MenuItem>
                <MenuItem onClick={deleteAccount}><PersonRemoveIcon sx={{ paddingRight: 1 }} />
                    Remove
                </MenuItem>
                <MenuItem onClick={handleLogout}><MeetingRoomIcon sx={{ paddingRight: 1 }} />
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
}
