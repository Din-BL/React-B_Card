import * as React from 'react';
import { AppBar, Menu, MenuItem, Container, IconButton, Typography, Toolbar, Box } from '@mui/material';
import { NavLink, useLocation } from "react-router-dom";
import { getData } from '../utils/localStorage';
import { capitalizeFirstLetter, navStyle, paths, smallNavStyle, userId } from '../utils/helpers';
import { LoginInfoContext } from '../context/LoginInfo';
import { Pages } from '../utils/types';
import MenuIcon from '@mui/icons-material/Menu';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import Theme from './Theme';
import logo from '../assets/business-card.png'
import Search from '../components/Search';
import UserIcon from '../components/UserIcon';

function Navbar() {
    const { loginInfo } = React.useContext(LoginInfoContext)
    const { admin, business, logged } = loginInfo
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const location = useLocation();
    const pages: Pages[] = ['about', 'favorite', 'my-cards', 'sandbox'];
    const conditionalPage = (page: Pages) => page === 'about' || (page === 'favorite' && logged) || (page === 'my-cards' && business) || admin
    const searchView = paths(['business', 'sandbox', 'login', 'register', 'about', 'add', 'edit'], location)
    const id = getData('user', '_id')

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => setAnchorElNav(null);

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
                        <img src={logo} height={40} alt="Card-Logo" />
                    </Box>
                    <Typography variant="h5" noWrap
                        sx={{
                            mr: 3,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 100,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }} >
                        <NavLink
                            to={`/home${userId()}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}>
                            B-Card
                        </NavLink>
                    </Typography>

                    <Box flexGrow={1} sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.filter((page) => conditionalPage(page)).map((page) => (
                                <MenuItem key={page} >
                                    <NavLink
                                        style={smallNavStyle}
                                        to={page === 'about' ? `/${page}` : `/${page}/${id}`}
                                        onClick={handleCloseNavMenu}>
                                        <Typography >
                                            {capitalizeFirstLetter(page)}
                                        </Typography>
                                    </NavLink>
                                </MenuItem>
                            ))}
                        </Menu>
                        <Box display='flex' alignItems='center' marginX={2} >
                            <NavLink to={`/home${userId()}`} >
                                <img src={logo} height={35} alt="Card-Logo" />
                            </NavLink>
                        </Box>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.filter((page) => conditionalPage(page)).map((page) => (
                            <NavLink
                                style={navStyle} key={page}
                                to={page === 'about' ? `/${page}` : `/${page}/${id}`}
                                onClick={handleCloseNavMenu}>
                                <Typography marginLeft={1}> {capitalizeFirstLetter(page)}</Typography>
                            </NavLink>
                        ))}
                    </Box>
                    {!searchView && <Search />}
                    <Theme />
                    {!logged &&
                        <NavLink style={navStyle} to={`/login`}>
                            <Typography marginRight={1.5}>
                                Login
                            </Typography>
                        </NavLink>}
                    {logged && <UserIcon />}
                    {!logged && <NoAccountsIcon />}
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default Navbar;