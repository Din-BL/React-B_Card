import { createContext, useContext } from "react";
import useAllCards from "../hooks/useAllCards";
import { useCards } from "../hooks/useCards";
import { useFavorite } from "../hooks/useFavorite";
import { errorAlert, removeAlert } from "../utils/sweetalert";
import { errorMsg, filteredCards, limitedRequests, removeDefaultCard } from "../utils/helpers";
import { BusinessCard } from "../utils/types";
import { deleteCard } from "../utils/services";
import { getData, setData } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { LoginInfoContext } from "./LoginInfo";

export const AllCardsContext = createContext<ReturnType<typeof useAllCards> & { removeCard: (card: BusinessCard) => void; }>(null!);
export const CardsContext = createContext<ReturnType<typeof useCards>>(null!);
export const FavoriteContext = createContext<ReturnType<typeof useFavorite>>(null!);

function Cards(props: React.PropsWithChildren<{}>) {
    const { cards, setCards, searchDefaultCards, addDefaultCard, categoryFilter, cardsFiltered } = useAllCards();
    const { data, deleteData, addData, editData, searchData } = useCards()
    const { favorite, setFavorite, deleteFavorite, searchFavorite } = useFavorite()
    const navigate = useNavigate()
    const favoriteCards = getData('favoriteCards')
    const users = Object.keys(localStorage).filter(item => /^[A-Z]/.test(item));
    const { setLoginInfo } = useContext(LoginInfoContext)

    function removeCard(card: BusinessCard) {
        removeAlert()
            .then((result) => {
                if (result.isConfirmed && card._id) {
                    if (limitedRequests(navigate)) {
                        errorAlert()
                    } else {
                        if (favoriteCards) {
                            setData('favoriteCards', filteredCards(favoriteCards, card))
                            deleteFavorite(card._id)
                            users.forEach(user => {
                                const username = getData(`${user}`)
                                setData(user, filteredCards(username, card))
                            });
                        } removeDefaultCard(card, setCards)
                        if (card.__v !== undefined) {
                            deleteCard(card._id)
                                .then(info => deleteData(card._id!))
                                .catch(e => errorMsg(e, navigate, setLoginInfo))
                        }
                    }
                }
            })
    }

    return (
        <AllCardsContext.Provider value={{ cards, setCards, searchDefaultCards, addDefaultCard, categoryFilter, cardsFiltered, removeCard }}>
            <CardsContext.Provider value={{ data, deleteData, addData, editData, searchData }}>
                <FavoriteContext.Provider value={{ favorite, setFavorite, deleteFavorite, searchFavorite }}>
                    {props.children}
                </FavoriteContext.Provider>
            </CardsContext.Provider>
        </AllCardsContext.Provider>
    );
}

export default Cards;



