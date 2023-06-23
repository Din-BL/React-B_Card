import { useEffect, useState } from "react";
import { defaultCards } from "../utils/cards";
import { BusinessCard } from "../utils/types";

export default function useCards() {
    const [cards, setCards] = useState<Array<BusinessCard>>(() => {
        const storedCards = localStorage.getItem("defaultCards");
        if (storedCards !== null) {
            try {
                return JSON.parse(storedCards);
            } catch (error) {
                console.error("Error parsing stored cards:", error);
            }
        }
        return defaultCards;
    });

    useEffect(() => {
        localStorage.setItem("defaultCards", JSON.stringify(cards));
    }, [cards]);

    return cards;
}
