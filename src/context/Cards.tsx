import { createContext } from "react";
import useCards from "../hooks/useCards";
import { useData } from "../hooks/useData";
import { useFavorite } from "../hooks/useFavorite";

export const CardsContext = createContext<ReturnType<typeof useCards>>(null!);
export const DataContext = createContext<ReturnType<typeof useData>>(null!);
export const FavoriteContext = createContext<ReturnType<typeof useFavorite>>(null!);

function Cards(props: React.PropsWithChildren<{}>) {
    const { cards, searchDefaultCards } = useCards();
    const { data, deleteData, addData, editData, searchData } = useData()
    const { favorite, setFavorite, searchFavorite } = useFavorite()
    console.log('test');

    return (
        <CardsContext.Provider value={{ cards, searchDefaultCards }}>
            <DataContext.Provider value={{ data, deleteData, addData, editData, searchData }}>
                <FavoriteContext.Provider value={{ favorite, setFavorite, searchFavorite }}>
                    {props.children}
                </FavoriteContext.Provider>
            </DataContext.Provider>
        </CardsContext.Provider>
    );
}

export default Cards;



