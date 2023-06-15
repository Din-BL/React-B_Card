import { Box, Typography } from "@mui/material";
import { TitleProps } from "../utils/types"

function Title({ main, sub }: TitleProps) {
    return (
        <Box paddingY={2} borderBottom={'1px solid #9d9d9d'}>
            <Typography variant="h2" component={'h1'}>{main}</Typography>
            <Typography variant="h5" component={'h2'}>{sub}</Typography>
        </Box>
    );
}

export default Title;