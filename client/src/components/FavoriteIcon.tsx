import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import { favoriteCard } from "../utils/favorite";
import { useToggle } from "../hooks/useToggle";
import { FavoriteIconProps } from "../utils/types";
import { useContext } from "react";
import { FavoriteContext } from "../context/Cards";

function FavoriteIcon({ card }: FavoriteIconProps) {
    const [checked, toggle] = useToggle(card)
    const { setFavorite } = useContext(FavoriteContext)

    return (
        <IconButton sx={{ padding: '6px' }} onClick={() => favoriteCard(toggle, card, setFavorite)} aria-label="favorite" >
            <Checkbox sx={{ padding: 0 }}
                checked={checked}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                color='error'
            />
        </IconButton>
    );
}

export default FavoriteIcon;