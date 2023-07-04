import { ChangeEvent, createContext, useContext, useState } from "react";
import useCards from "../hooks/useCards";
import { BusinessCard } from "../utils/types";
import { useData } from "../hooks/useData";
import { getData } from "../utils/localStorage";

export const CardsContext = createContext<ReturnType<typeof useCards>>(null!);
export const DataContext = createContext<ReturnType<typeof useData>>(null!);

function Cards(props: React.PropsWithChildren<{}>) {

    const { cards, searchDefaultCards } = useCards();
    const { data, deleteData, addData, editData, searchData } = useData()

    return (
        <CardsContext.Provider value={{ cards, searchDefaultCards }}>
            <DataContext.Provider value={{ data, deleteData, addData, editData, searchData }}>
                {props.children}
            </DataContext.Provider>
        </CardsContext.Provider>
    );
}

export default Cards;



