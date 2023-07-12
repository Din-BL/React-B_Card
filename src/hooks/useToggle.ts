import { useState, useEffect } from "react";
import { BusinessCard } from "../utils/types";
import { getData } from "../utils/localStorage";

export function useToggle(card: BusinessCard): [boolean, () => void] {
    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
        const favData = getData((getData('user', 'userName')));
        if (favData) {
            const isFavorite = favData.some((data: BusinessCard) => data._id === card._id);
            setChecked(isFavorite);
        }
    }, [card]);

    const toggle = () => setChecked(currentCheck => !currentCheck);

    return [checked, toggle];
}

