import { createContext } from "react";
import useCards from "../hooks/useCards";
import { useData } from "../hooks/useData";
import { useFavorite } from "../hooks/useFavorite";

export const CardsContext = createContext<ReturnType<typeof useCards>>(null!);
export const DataContext = createContext<ReturnType<typeof useData>>(null!);
export const FavoriteContext = createContext<ReturnType<typeof useFavorite>>(null!);

function Cards(props: React.PropsWithChildren<{}>) {
    const { cards, setCards, searchDefaultCards, addDefaultCard } = useCards();
    const { data, deleteData, addData, editData, searchData } = useData()
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



