import { useEffect, useState } from "react";
import { defaultCards } from "../utils/cards";
import { BusinessCard } from "../utils/types";
import { getData, setData } from "../utils/localStorage";

export default function useCards() {
    const [cards, setCards] = useState<Array<BusinessCard>>(() => {
        const storedCards = getData("defaultCards")
        if (!storedCards) {
            return defaultCards;
        }
        return storedCards;
    });

    useEffect(() => {
        setData("defaultCards", cards)
    }, [cards]);

    return [cards, setCards];
}
