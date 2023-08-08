import { createContext } from "react";
import useAllCards from "../hooks/useAllCards";
import { useCards } from "../hooks/useCards";
import { useFavorite } from "../hooks/useFavorite";

export const AllCardsContext = createContext<ReturnType<typeof useAllCards>>(null!);
export const CardsContext = createContext<ReturnType<typeof useCards>>(null!);
export const FavoriteContext = createContext<ReturnType<typeof useFavorite>>(null!);

function Cards(props: React.PropsWithChildren<{}>) {
    const { cards, setCards, searchDefaultCards, addDefaultCard } = useAllCards();
    const { data, deleteData, addData, editData, searchData } = useCards()
    const { favorite, setFavorite, deleteFavorite, searchFavorite } = useFavorite()

    return (
        <AllCardsContext.Provider value={{ cards, setCards, searchDefaultCards, addDefaultCard }}>
            <CardsContext.Provider value={{ data, deleteData, addData, editData, searchData }}>
                <FavoriteContext.Provider value={{ favorite, setFavorite, deleteFavorite, searchFavorite }}>
                    {props.children}
                </FavoriteContext.Provider>
            </CardsContext.Provider>
        </AllCardsContext.Provider>
    );
}

export default Cards;



