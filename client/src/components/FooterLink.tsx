import { Typography, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { FooterLinkProps } from '../utils/types';

export const FooterLink = ({ to, icon, text }: FooterLinkProps) => {
    const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.up('sm'));
    return (
        <Typography color="text.secondary" variant={isSmallScreen ? 'body2' : 'caption'} component="h5">
            <Link
                to={to}
                style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {icon}
                <span>{text}</span>
            </Link>
        </Typography>
    )
}







