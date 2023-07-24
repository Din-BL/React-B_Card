import * as React from 'react';
import { AppBar, Menu, Button, MenuItem, Container, IconButton, Typography, Toolbar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Search from './Search';
import Theme from './Theme';
import { getData } from '../utils/localStorage';
import UserIcon from './UserIcon';
import logo from '../assets/business-card.png'
import { paths, userId } from '../utils/helpers';
import { LoginInfoContext } from '../context/LoginInfo';
import { Pages } from '../utils/types';

function Navbar() {
    const { loginInfo } = React.useContext(LoginInfoContext)
    const { admin, business, logged } = loginInfo
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const location = useLocation();
    const pages: Pages[] = ['About', 'Favorite', 'My Cards', 'SandBox'];
    const conditionalPage = (page: Pages) => page === 'About' || (page === 'Favorite' && logged) || (page === 'My Cards' && business) || admin
    const searchView = paths(['business', 'sandbox', 'login', 'register', 'about', 'add', 'edit'], location)
    const id = getData('user', '_id')

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleNavigation = (page: string) => {
        page === 'About' ? navigate(`/${page}`) : navigate(`/${page}/${id}`)
        setAnchorElNav(null);
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
                        <NavLink to={`/home${userId()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            B-CARD
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
                                <MenuItem key={page} onClick={() => handleNavigation(page)}>
                                    <Typography textAlign="center">
                                        {page}
                                    </Typography>
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
                            <Button key={page} onClick={() => handleNavigation(page)} sx={{ my: 2, color: 'white', display: 'block' }}>
                                {page}
                            </Button>
                        ))}
                    </Box>
                    {!searchView && <Search />}
                    <Theme />
                    {!logged &&
                        <Typography fontWeight={500} fontSize={'0.875rem'} marginX={1}>
                            <NavLink to={`/login`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                LOGIN
                            </NavLink>
                        </Typography>
                    }
                    {logged && <UserIcon />}
                    {!logged && <NoAccountsIcon />}
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default Navbar;