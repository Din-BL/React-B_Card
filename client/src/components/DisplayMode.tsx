import * as React from 'react';
import { ToggleButton, ToggleButtonGroup, useMediaQuery } from '@mui/material';
import { TableView, ViewModule } from '@mui/icons-material';
import { ViewContext } from '../context/ViewMode';
import { useLocation } from 'react-router-dom';
import { pathUrl } from '../utils/helpers';

export default function DisplayMode() {
    const location = useLocation()
    const { view, handleView } = React.useContext(ViewContext)
    const isSmScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
    const iconsMargin = () => pathUrl('home', location) ? isSmScreen ? 0 : 3 : 0

    return (
        <ToggleButtonGroup
            size='large'
            sx={{ marginRight: iconsMargin() }}
            value={view}
            exclusive
            onChange={handleView}
        >
            <ToggleButton value="grid" aria-label="grid">
                <ViewModule />
            </ToggleButton>
            <ToggleButton value="table" aria-label="table">
                <TableView />
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
