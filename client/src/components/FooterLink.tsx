import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Info, Favorite, RecentActors, AdminPanelSettings, Restore, Email } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { allowedPages, extractPath, userId } from '../utils/helpers';
import { getData } from '../utils/localStorage';
import { LoginInfoContext } from '../context/LoginInfo';
import { useMediaQuery } from '@mui/material';

export default function FooterLink() {
    const [value, setValue] = React.useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const id = getData('user', '_id')
    const { loginInfo } = React.useContext(LoginInfoContext)
    const { admin, business, logged } = loginInfo
    const isSmScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

    const navigationItems = [
        { label: 'Recent', icon: <Restore />, action: () => navigate(-1) },
        { label: 'Contact Us', icon: <Email />, route: '/contact' },
        { label: 'About', icon: <Info />, route: `/about${userId()}` },
        { label: 'Favorite', icon: <Favorite />, route: `/favorite/${id}` },
        { label: 'My Cards', icon: <RecentActors />, route: `/my-cards/${id}` },
        { label: 'SandBox', icon: <AdminPanelSettings />, route: `/sandbox/${id}` }
    ];

    const conditionalPage = (page: string) => {
        switch (page) {
            case 'favorite':
                return ((logged && !isSmScreen));
            case 'my cards':
                return (business && !isSmScreen);
            default:
                return (allowedPages.includes(page) || admin && !isSmScreen);
        }
    }

    React.useEffect(() => {
        let pathIndex = extractPath(location.pathname, navigationItems)
        pathIndex = pathIndex === -1 ? 0 : pathIndex
        setValue(pathIndex)
    }, [location.pathname])

    return (
        <Box sx={{ width: 500 }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    const selectedItem = navigationItems[newValue];
                    if (selectedItem?.action) {
                        selectedItem.action();
                    } else if (selectedItem?.route) {
                        setValue(newValue);
                        navigate(selectedItem.route);
                    }
                }}
            >
                {navigationItems.filter((page) => conditionalPage(page.label.toLocaleLowerCase())).map((item, index) => (
                    <BottomNavigationAction
                        sx={{ padding: 0 }}
                        key={index}
                        label={item.label}
                        icon={item.icon}
                    />
                ))}
            </BottomNavigation>
        </Box>
    );
}
