import { createContext, useContext } from "react";
import useCards from "../hooks/useCards";
import { BusinessCard } from "../utils/types";

export interface CardsContextType {
    cards: BusinessCard[] | React.Dispatch<React.SetStateAction<BusinessCard[]>>
    setCards: BusinessCard[] | React.Dispatch<React.SetStateAction<BusinessCard[]>>
}

export const CardsContext = createContext<CardsContextType>(null!);

function Cards(props: React.PropsWithChildren<{}>) {
    const [cards, setCards] = useCards();
    return (
        <CardsContext.Provider value={{ cards, setCards }}>
            {props.children}
        </CardsContext.Provider>
    );
}

export default Cards;
