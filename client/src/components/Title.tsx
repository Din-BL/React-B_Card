import {Box, Typography, useMediaQuery} from '@mui/material';
import {TitleProps} from '../utils/types';
import Categories from './Categories';
import DisplayMode from './DisplayMode';
import {pathUrl} from '../utils/helpers';
import {useLocation} from 'react-router-dom';
import {ThemeContext} from '../context/Theme';
import {useContext} from 'react';

function Title({main, sub}: TitleProps) {
  const isMdScreen = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const isSmScreen = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const location = useLocation();
  const additionalView = !pathUrl(`sandbox`, location);
  const homeView = pathUrl(`home`, location);
  const {themeMode} = useContext(ThemeContext);

  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={isMdScreen ? 'center' : 'unset'} flexDirection={isMdScreen ? 'column' : 'row'} component={'header'} paddingY={3} marginBottom={3} borderBottom={'1px solid #9d9d9d'}>
      <Box className="title">
        <Typography fontFamily={'Raleway; sans-serif'} component={'h1'}>
          {main}
        </Typography>
        <Typography sx={{color: themeMode === 'light' ? 'rgba(0, 0, 0, 0.4)' : ''}} component={'h2'}>
          {sub}
        </Typography>
      </Box>
      {additionalView && (
        <Box width={isSmScreen ? 'unset' : isMdScreen ? '100%' : 'unset'} display={'flex'} justifyContent={'end'} alignItems={'end'}>
          <DisplayMode />
          {homeView && <Categories />}
        </Box>
      )}
    </Box>
  );
}

export default Title;
