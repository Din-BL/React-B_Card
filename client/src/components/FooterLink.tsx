import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FooterLinkProps } from '../utils/types';

export const FooterLink = ({ to, icon, text }: FooterLinkProps) => (
    <Typography color="text.secondary" variant="body2" component="h5">
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
);







