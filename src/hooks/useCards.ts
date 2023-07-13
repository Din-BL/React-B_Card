import { ChangeEvent, useEffect, useState } from "react";
import { defaultCards } from "../utils/cards";
import { BusinessCard } from "../utils/types";
import { getData, setData } from "../utils/localStorage";

export default function useCards() {
    const [cards, setCards] = useState<Array<BusinessCard>>(() => {
        const storedCards = getData("defaultCards")
        if (!storedCards) {
            localStorage.clear()
            return defaultCards;
        }
        return storedCards;
    });

    const searchDefaultCards = (e: ChangeEvent<HTMLInputElement>) => {
        setCards((currentCards: BusinessCard[]) => {
            const filteredCards = currentCards.filter((card: BusinessCard) => {
                return card.title.toLocaleLowerCase().startsWith(e.target.value.toLocaleLowerCase())
            })
            return e.target.value === "" ? defaultCards : filteredCards
        })
    }

    useEffect(() => {
        setData("defaultCards", cards)
    }, [cards]);

    return { cards, searchDefaultCards };
}
