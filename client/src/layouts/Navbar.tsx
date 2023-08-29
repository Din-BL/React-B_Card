import * as React from 'react';
import { AppBar, Menu, MenuItem, Container, IconButton, Typography, Toolbar, Box, Divider } from '@mui/material';
import { Link, NavLink, useLocation } from "react-router-dom";
import { getData } from '../utils/localStorage';
import { allowedPages, capitalizeFirstLetter, menuPages, navStyle, pages, paths, smallNavStyle, userId } from '../utils/helpers';
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
    const id = getData('userInfo', '_id')
    const isLoggedPage: Pages[] = logged ? pages : menuPages
    const conditionalPage = (page: Pages) => allowedPages.includes(page) || (page === 'favorite' && logged) || (page === 'my-cards' && business) || admin
    const searchView = paths(['home', 'favorite', 'my-cards'], location)
    const bigScreenMenu = logged ? { xs: 'none', md: 'flex' } : { xs: 'none', sm: 'flex' }
    const smallScreenMenu = logged ? { xs: 'flex', md: 'none' } : { xs: 'flex', sm: 'none' }
    const loggedView = logged ? { xs: 'none' } : { xs: 'none', sm: 'block' }

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => setAnchorElNav(null);

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box marginRight={3} sx={{ display: bigScreenMenu }}>
                        <img src={logo} height={40} alt="Card-Logo" />
                        <Typography variant="h5" noWrap marginLeft={1}
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 100,
                                letterSpacing: '.2rem'
                            }}>
                            <Link
                                to={`/home${userId()}`}
                                style={{ textDecoration: 'none', color: 'inherit' }}>
                                B-Card
                            </Link>
                        </Typography>
                    </Box>

                    <Box flexGrow={1} sx={{ display: smallScreenMenu }}>
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
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                        >
                            {isLoggedPage
                                .filter((page) => conditionalPage(page))
                                .flatMap((page, index, array) => [
                                    <MenuItem key={`menuItem_${page}`}>
                                        <NavLink
                                            style={smallNavStyle}
                                            to={!id ? `/${page}` : `/${page}/${id}`}
                                            onClick={handleCloseNavMenu}
                                        >
                                            <Typography>
                                                {capitalizeFirstLetter(page)}
                                            </Typography>
                                        </NavLink>
                                    </MenuItem>,
                                    index !== array.length - 1 && (
                                        <Divider key={`divider_${page}`} />
                                    )
                                ])}
                        </Menu>
                        <Box display='flex' alignItems='center' marginX={2} >
                            <Link to={`/home${userId()}`} >
                                <img src={logo} height={35} alt="Card-Logo" />
                            </Link>
                        </Box>
                    </Box>
                    <Box flexGrow={1} sx={{ display: bigScreenMenu }}>
                        {pages.filter((page) => conditionalPage(page)).map((page) => (
                            <NavLink
                                style={navStyle} key={page}
                                to={!id ? `/${page}` : `/${page}/${id}`}
                                onClick={handleCloseNavMenu}>
                                <Typography marginLeft={1.5}> {capitalizeFirstLetter(page)}</Typography>
                            </NavLink>
                        ))}
                    </Box>
                    {searchView && <Search />}
                    <Theme />
                    <Typography
                        sx={{ display: loggedView }}
                        marginRight={1.5} >
                        <NavLink style={navStyle} to={`/login`}>
                            Login
                        </NavLink>
                    </Typography>
                    {logged ? <UserIcon /> : <NoAccountsIcon />}
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default Navbar;