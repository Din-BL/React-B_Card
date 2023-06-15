import { Typography, Box, Stack, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

export default function Footer() {
    return (
        <Paper sx={{ paddingY: '10px' }} elevation={3}>
            <Box display="flex" justifyContent="center" alignItems="center" paddingBottom='10px'>
                <Stack direction="row" spacing={9}>
                    <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <InfoIcon color="action" />
                        <Typography color="text.secondary" variant='body2' component={'h5'}> About</Typography>
                    </Box>
                    <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <FavoriteIcon color="action" />
                        <Typography color="text.secondary" variant='body2' component={'h5'}> Favorite</Typography>
                    </Box>
                    <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <RecentActorsIcon color="action" />
                        <Typography color="text.secondary" variant='body2' component={'h5'}> My Cards</Typography>
                    </Box>
                </Stack>
            </Box>
        </Paper>
    );
}
