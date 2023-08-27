import * as React from 'react';
import { ToggleButton, ToggleButtonGroup, useMediaQuery } from '@mui/material';
import { TableView, ViewModule } from '@mui/icons-material';
import { ViewContext } from '../context/ViewMode';

export default function DisplayMode() {
    const { view, handleView } = React.useContext(ViewContext)
    const isSmScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

    return (
        <ToggleButtonGroup
            size='large'
            sx={{ marginRight: isSmScreen ? 0 : 3 }}
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