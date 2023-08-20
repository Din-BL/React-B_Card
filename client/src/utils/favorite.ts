import { getData, setData } from "./localStorage"
import { BusinessCard } from "./types"

export const favoriteCard = (toggle: () => void, card: BusinessCard, setFavorite: React.Dispatch<React.SetStateAction<any[] | BusinessCard[] | null>>) => {
    toggle()
    const username = getData('user', 'userName')
    let favData: BusinessCard[] | null = getData(username)
    if (favData) {
        if (favData.some((data: BusinessCard) => data._id === card._id)) {
            setData(username, favData.filter((cardInfo: BusinessCard) => cardInfo._id !== card._id))
            favData = getData(username)
            setFavorite(favData)
        } else {
            setData(username, [...favData, { ...card, isFavorite: true }])
            favData = getData(username)
            setFavorite(favData)
        }
    } else {
        setData(username, [{ ...card, isFavorite: true }])
        favData = getData(username)
        setFavorite(favData)
    }

}