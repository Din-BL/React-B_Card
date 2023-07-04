import { ChangeEvent, useContext, useEffect, useState } from "react"
import { getData } from "../utils/localStorage"
import { BusinessCard } from "../utils/types"
import { LoggedContext } from "../context/LoginInfo"

export function useFavorite() {
    const { logged } = useContext(LoggedContext)
    const [favorite, setFavorite] = useState<BusinessCard[] | any[]>([])

    const searchFavorite = (e: ChangeEvent<HTMLInputElement>) => {
        setFavorite((currentCards: BusinessCard[]) => {
            const filteredCards = currentCards.filter((card: BusinessCard) => {
                return card.title.toLocaleLowerCase().startsWith(e.target.value.toLocaleLowerCase())
            })
            return e.target.value === "" ? getData((getData('user', 'userName'))) : filteredCards
        })
    }

    useEffect(() => {
        setFavorite(getData((getData('user', 'userName'))) || [])
    }, [logged])

    return { favorite, setFavorite, searchFavorite }
}
