import { getData, setData } from "./localStorage"
import { BusinessCard } from "./types"

export const favoriteCard = (toggle: () => void, card: BusinessCard, setFavorite: React.Dispatch<React.SetStateAction<any[] | BusinessCard[] | null>>) => {
    toggle()
    let favData: BusinessCard[] | any[] = getData((getData('user', 'userName')))
    if (favData) {
        if (favData.some((data: BusinessCard) => data._id === card._id)) {
            setData(getData('user', 'userName'), favData.filter((cardInfo: BusinessCard) => cardInfo._id !== card._id))
            favData = getData((getData('user', 'userName')))
            setFavorite(favData)
        } else {
            setData(getData('user', 'userName'), [...favData, { ...card, isFavorite: true }])
            favData = getData((getData('user', 'userName')))
            setFavorite(favData)
        }
    } else {
        setData(getData('user', 'userName'), [{ ...card, isFavorite: true }])
        favData = getData((getData('user', 'userName')))
        setFavorite(favData)
    }

}