import {ThumbUpOffAlt, ThumbDownOffAlt} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import {FavoriteIconProps} from '../utils/types';
import {useRating} from '../hooks/useRating';

function RatingIcon({card}: FavoriteIconProps) {
  const {checked, rate} = useRating(card);
  return (
    <>
      <IconButton onClick={() => rate(false)} sx={{padding: '6px'}} aria-label="rating">
        <ThumbUpOffAlt color={checked.liked ? 'primary' : 'action'} />
      </IconButton>
      <IconButton onClick={() => rate(true)} sx={{padding: '6px'}} aria-label="rating">
        <ThumbDownOffAlt color={checked.disliked ? 'primary' : 'action'} />
      </IconButton>
    </>
  );
}

export default RatingIcon;
