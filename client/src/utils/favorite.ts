import { filteredCards, uniqueFavorites } from "./helpers"
import { getData, setData } from "./localStorage"
import { BusinessCard, FavoriteCardsParams } from "./types"

export const favoriteCard = ({ toggle, card, setFavorite, admin }: FavoriteCardsParams) => {
    toggle()
    const favorites = getData('favoriteCards')
    const username = getData('userInfo', 'userName')
    const favoriteUser = getData(username)
    const setFavoriteChoice = () => admin ? setFavorite(uniqueFavorites()) : setFavorite(getData(username))

    if (favoriteUser) {
        if (favoriteUser.some((data: BusinessCard) => data._id === card._id)) {
            setData(username, filteredCards(favoriteUser, card))
            const indexToRemove = favorites.findIndex((cardInfo: BusinessCard) => cardInfo._id === card._id);
            favorites.splice(indexToRemove, 1);
            setData('favoriteCards', favorites);
            setFavoriteChoice()
        } else {
            setData(username, [...favoriteUser, { ...card, isFavorite: true }])
            setData('favoriteCards', [...favorites, { ...card, isFavorite: true }])
            setFavoriteChoice()
        }
    } else {
        setData(username, [{ ...card, isFavorite: true }])
        favorites ? setData('favoriteCards', [...favorites, { ...card, isFavorite: true }]) : setData('favoriteCards', [{ ...card, isFavorite: true }])
        setFavoriteChoice()
    }
}

