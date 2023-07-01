import { createContext, useContext } from "react";
import useCards from "../hooks/useCards";
import { BusinessCard } from "../utils/types";
import { useData } from "../hooks/useData";

export interface CardsContextType {
    cards: BusinessCard[] | React.Dispatch<React.SetStateAction<BusinessCard[]>>
    setCards: BusinessCard[] | React.Dispatch<React.SetStateAction<BusinessCard[]>>
}

export const CardsContext = createContext<CardsContextType>(null!);
export const DataContext = createContext<any>(null!);

function Cards(props: React.PropsWithChildren<{}>) {
    const [cards, setCards] = useCards();
    const { data, deleteData } = useData()


    return (
        <CardsContext.Provider value={{ cards, setCards }}>
            <DataContext.Provider value={{ data, deleteData }}>
                {props.children}
            </DataContext.Provider>
        </CardsContext.Provider>
    );
}

export default Cards;
