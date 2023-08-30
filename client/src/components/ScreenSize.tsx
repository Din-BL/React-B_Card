import { ToggleButtonGroup, ToggleButton, useMediaQuery } from '@mui/material';
import { Tablet, Laptop, PhoneAndroid } from '@mui/icons-material';

export default function ScreenSize() {
    const isLaptopScreen = useMediaQuery('(min-width: 1025px)');
    const isTabletScreen = useMediaQuery('(min-width: 601px) and (max-width: 1024px)');
    const isMobileScreen = useMediaQuery('(max-width: 600px)');

    return (
        <ToggleButtonGroup sx={{ position: 'absolute', top: '64px', right: 0 }}
            size='small'
            aria-label="device"
            disabled
        >
            {isLaptopScreen && (
                <ToggleButton selected value="laptop" aria-label="laptop">
                    <Laptop />
                </ToggleButton>
            )}
            {isTabletScreen && (
                <ToggleButton selected value="tablet" aria-label="tablet">
                    <Tablet />
                </ToggleButton>
            )}
            {isMobileScreen && (
                <ToggleButton selected value="phone" aria-label="phone">
                    <PhoneAndroid />
                </ToggleButton>
            )}
        </ToggleButtonGroup>
    );
}
