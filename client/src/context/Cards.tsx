import { createContext } from "react";
import useAllCards from "../hooks/useAllCards";
import { useCards } from "../hooks/useCards";
import { useFavorite } from "../hooks/useFavorite";

export const CardsContext = createContext<ReturnType<typeof useAllCards>>(null!);
export const DataContext = createContext<ReturnType<typeof useCards>>(null!);
export const FavoriteContext = createContext<ReturnType<typeof useFavorite>>(null!);

function Cards(props: React.PropsWithChildren<{}>) {
    const { cards, setCards, searchDefaultCards, addDefaultCard } = useAllCards();
    const { data, deleteData, addData, editData, searchData } = useCards()
    const { favorite, setFavorite, deleteFavorite, searchFavorite } = useFavorite()

    return (
        <CardsContext.Provider value={{ cards, setCards, searchDefaultCards, addDefaultCard }}>
            <DataContext.Provider value={{ data, deleteData, addData, editData, searchData }}>
                <FavoriteContext.Provider value={{ favorite, setFavorite, deleteFavorite, searchFavorite }}>
                    {props.children}
                </FavoriteContext.Provider>
            </DataContext.Provider>
        </CardsContext.Provider>
    );
}

export default Cards;



