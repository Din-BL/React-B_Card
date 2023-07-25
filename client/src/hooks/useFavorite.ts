import { ChangeEvent, useContext, useEffect, useState } from "react"
import { getData } from "../utils/localStorage"
import { BusinessCard } from "../utils/types"
import { LoginInfoContext } from "../context/LoginInfo"

export function useFavorite() {
    const { loginInfo } = useContext(LoginInfoContext)
    const { logged } = loginInfo
    const [favorite, setFavorite] = useState<BusinessCard[] | null>([])
    const favoriteCards = getData((getData('user', 'userName')))

    const searchFavorite = (e: ChangeEvent<HTMLInputElement>) => {
        setFavorite((currentCards: BusinessCard[] | null) => {
            if (Array.isArray(currentCards)) {
                const filteredCards = currentCards.filter((card: BusinessCard) => {
                    return card.title.toLocaleLowerCase().startsWith(e.target.value.toLocaleLowerCase())
                })
                return e.target.value === "" ? favoriteCards : filteredCards
            }
        })
    }

    function deleteFavorite(id: string) {
        setFavorite((currentData) => currentData && currentData.filter((data) => data._id !== id))
    }

    useEffect(() => {
        setFavorite(favoriteCards || [])
    }, [logged])

    return { favorite, setFavorite, deleteFavorite, searchFavorite }
}
