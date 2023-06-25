import * as React from 'react';
import { AppBar, Menu, Avatar, Button, Tooltip, MenuItem, Container, IconButton, Typography, Toolbar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WorkIcon from '@mui/icons-material/Work';
import { NavLink, useNavigate } from "react-router-dom";
import Search from './Search';
import Theme from './Theme';
import { getData, removeData } from '../utils/token';
import UserIcon from './UserIcon';

const pages = ['About', 'Favorite', 'My Cards', 'SandBox'];

function Navbar() {
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleNavigation = (page: string) => {
        page && navigate(`/${page}`)
        setAnchorElNav(null);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <WorkIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            fontSize: 27.5
                        }}
                    >
                        <NavLink to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            B-CARD
                        </NavLink>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                            {pages.filter((page) => page === 'About' || getData('token')).map((page) => (
                                <MenuItem key={page} onClick={() => handleNavigation(page)}>
                                    <Typography textAlign="center">
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <WorkIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                            <Typography variant="h5" noWrap
                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }} >
                                <NavLink to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    B-CARD
                                </NavLink>
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.filter((page) => page === 'About' || getData('token')).map((page) => (
                            <Button
                                key={page}
                                onClick={() => handleNavigation(page)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Search />
                    <Theme />
                    {!getData('token') &&
                        <Typography fontWeight={500} fontSize={'0.875rem'} marginX={1}>
                            <NavLink to={`/login`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                LOGIN
                            </NavLink>
                        </Typography>
                    }
                    {getData('token') && <UserIcon />}
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default Navbar;