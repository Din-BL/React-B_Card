import { useEffect, useState } from "react";
import { insertData } from "../services/defaultCards";
import { BusinessCard } from "../utils/types";

export default function useCards() {

    const [cards, setCards] = useState<Array<BusinessCard>>([])

    useEffect(() => {
        insertData()
            .then(data => {
                console.log(data);
                setCards(data)
            })
    }, [])

    return cards

}
