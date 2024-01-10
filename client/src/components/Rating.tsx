import {Box, Rating} from '@mui/material';
import {B_Rating} from '../utils/types';

export default function BasicRating({rating}: B_Rating) {
  return (
    <Box marginLeft={1} display={'inline'}>
      <Rating name="rating" value={rating} readOnly />
    </Box>
  );
}
