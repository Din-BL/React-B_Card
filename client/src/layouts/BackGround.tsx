import {blue} from '@mui/material/colors';
import {ThemeContext} from '../context/Theme';
import {useContext} from 'react';
import {Box} from '@mui/material';

function BackGround(props: React.PropsWithChildren<{}>) {
  const {themeMode} = useContext(ThemeContext);
  const color = blue[50];
  return <Box sx={{backgroundColor: themeMode === 'light' ? color : ''}}>{props.children}</Box>;
}

export default BackGround;
