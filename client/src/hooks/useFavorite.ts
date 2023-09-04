import { ChangeEvent, useContext, useEffect, useState } from "react"
import { getData } from "../utils/localStorage"
import { BusinessCard } from "../utils/types"
import { LoginInfoContext } from "../context/LoginInfo"
import { uniqueFavorites } from "../utils/helpers"

export function useFavorite() {
    const { loginInfo } = useContext(LoginInfoContext)
    const { logged, admin } = loginInfo
    const [favorite, setFavorite] = useState<BusinessCard[]>([])
    const favoriteCards = getData(getData('userInfo', 'userName'))
    const allFavoriteCards = getData('favoriteCards')

    const searchFavorite = (e: ChangeEvent<HTMLInputElement>) => {
        setFavorite((currentCards: BusinessCard[]) => {
            const filteredCards = currentCards.filter((card: BusinessCard) => {
                return card.title.toLowerCase().startsWith(e.target.value.toLowerCase())
            })
            if (admin) {
                return e.target.value === "" ? uniqueFavorites(allFavoriteCards) : filteredCards
            } return e.target.value === "" ? favoriteCards : filteredCards
        })
    }

    function editFavorite(id: string, data: BusinessCard) {
        setFavorite((currentData) => currentData.map((card) => {
            return card._id === id ? data : card
        }))
    }

    function deleteFavorite(id: string) {
        setFavorite((currentData) => currentData.filter((data: BusinessCard) => data._id !== id))
    }

    useEffect(() => {
        admin ? setFavorite(uniqueFavorites(allFavoriteCards) || []) : setFavorite(favoriteCards || [])
    }, [logged])

    return { favorite, setFavorite, deleteFavorite, searchFavorite, editFavorite }
}
