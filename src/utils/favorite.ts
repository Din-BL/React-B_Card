import { getData, setData } from "./localStorage"
import { BusinessCard } from "./types"

export const favoriteCard = (toggle: () => void, card: BusinessCard, setCards: React.Dispatch<any>) => {
    toggle()
    let favData = getData((getData('user', 'userName')))
    if (favData) {
        if (favData.some((data: BusinessCard) => data._id === card._id)) {
            setData(getData('user', 'userName'), favData.filter((cardInfo: BusinessCard) => cardInfo._id !== card._id))
            favData = getData((getData('user', 'userName')))
            setCards && setCards(favData)
        } else {
            setData(getData('user', 'userName'), [...favData, { ...card, isFavorite: true }])
        }
    } else {
        setData(getData('user', 'userName'), [{ ...card, isFavorite: true }])
    }

}