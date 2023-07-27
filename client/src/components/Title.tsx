import { Box, Typography, useMediaQuery } from "@mui/material";
import { TitleProps } from "../utils/types"

function Title({ main, sub }: TitleProps) {
    const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
    return (
        <Box
            sx={{ display: { xs: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', sm: 'block' } }}
            component={'header'}
            paddingY={3}
            marginBottom={3}
            borderBottom={'1px solid #9d9d9d'}>
            <Typography
                paddingBottom={0.5}
                variant={isSmallScreen ? 'h4' : 'h2'}
                component={'h1'}>{main}
            </Typography>
            <Typography
                variant={isSmallScreen ? 'subtitle2' : 'h5'}
                fontSize={isSmallScreen ? 'small' : 'large'}
                component={'h2'}>{sub}
            </Typography>
        </Box>
    );
}

export default Title;