import { ChangeEvent, useContext, useEffect, useState } from "react"
import { getData } from "../utils/localStorage"
import { BusinessCard } from "../utils/types"
import { LoginInfoContext } from "../context/LoginInfo"

export function useFavorite() {
    const { loginInfo } = useContext(LoginInfoContext)
    const { logged } = loginInfo
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
