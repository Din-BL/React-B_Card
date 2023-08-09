import { Box, Typography, useMediaQuery } from "@mui/material";
import { TitleProps } from "../utils/types"
import Categories from "./Categories";
import DisplayMode from "./DisplayMode";

function Title({ main, sub }: TitleProps) {
    const isMdScreen = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
    const isSmScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

    return (
        <Box display={'flex'}
            justifyContent={'space-between'}
            alignItems={isMdScreen ? 'center' : 'unset'}
            flexDirection={isMdScreen ? 'column' : 'row'}
            component={'header'}
            paddingY={3}
            marginBottom={3}
            borderBottom={'1px solid #9d9d9d'}>
            <Box>
                <Typography
                    paddingBottom={0.5}
                    variant={isSmScreen ? 'h4' : isMdScreen ? 'h3' : 'h2'}
                    component={'h1'}>{main}
                </Typography>
                <Typography
                    paddingBottom={isMdScreen ? 2 : 0}
                    variant={isMdScreen ? 'subtitle2' : 'h5'}
                    fontSize={isSmScreen ? 'small' : isMdScreen ? 'medium' : 'large'}
                    component={'h2'}>{sub}
                </Typography>
            </Box>
            <Box display={'flex'} alignItems={'end'}>
                <DisplayMode />
                <Categories />
            </Box>
        </Box>
    );
}

export default Title;