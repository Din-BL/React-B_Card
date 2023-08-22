import { getData, setData } from "./localStorage"
import { BusinessCard } from "./types"

export const favoriteCard = (toggle: () => void, card: BusinessCard, setFavorite: React.Dispatch<React.SetStateAction<any[] | BusinessCard[] | null>>) => {
    toggle()
    const favorites = getData('favorites')
    const username = getData('userInfo', 'userName')
    const favoriteUser = getData(username)

    if (favoriteUser) {
        if (favoriteUser.some((data: BusinessCard) => data._id === card._id)) {
            setData(username, favoriteUser.filter((cardInfo: BusinessCard) => cardInfo._id !== card._id))
            const indexToRemove = favorites.findIndex((cardInfo: BusinessCard) => cardInfo._id === card._id);
            favorites.splice(indexToRemove, 1);
            setData('favorites', favorites);
            setFavorite(getData(username))
        } else {
            setData(username, [...favoriteUser, { ...card, isFavorite: true }])
            setData('favorites', [...favorites, { ...card, isFavorite: true }])
            setFavorite(getData(username))
        }
    } else {
        setData(username, [{ ...card, isFavorite: true }])
        favorites ? setData('favorites', [...favorites, { ...card, isFavorite: true }]) : setData('favorites', [{ ...card, isFavorite: true }])
        setFavorite(getData(username))
    }
}

