import { createContext, useContext, useState } from "react";
import useCards from "../hooks/useCards";
import { BusinessCard } from "../utils/types";
import { useData } from "../hooks/useData";
import { getData } from "../utils/localStorage";

export interface CardsContextType {
    cards: BusinessCard[] | React.Dispatch<React.SetStateAction<BusinessCard[]>>
    setCards: BusinessCard[] | React.Dispatch<React.SetStateAction<BusinessCard[]>>
}

export const CardsContext = createContext<CardsContextType>(null!);
export const DataContext = createContext<ReturnType<typeof useData>>(null!);


function Cards(props: React.PropsWithChildren<{}>) {

    const [cards, setCards] = useCards();
    const { data, deleteData, addData } = useData()

    return (
        <CardsContext.Provider value={{ cards, setCards }}>
            <DataContext.Provider value={{ data, deleteData, addData }}>
                {props.children}
            </DataContext.Provider>
        </CardsContext.Provider>
    );
}

export default Cards;





// import React, { createContext, useContext } from "react";
// import useCards from "../hooks/useCards";
// import { BusinessCard } from "../utils/types";
// import { useData } from "../hooks/useData";
// import { getData } from "../utils/localStorage";


// export const DataContext = createContext<ReturnType<typeof useData>>(null!);


// function Data(props: React.PropsWithChildren<{}>) {

//     if (getData('user', 'business')) {
//         const { data, deleteData, addData } = useData()

//         return (
//             <DataContext.Provider value={{ data, deleteData, addData }}>
//                 {props.children}
//             </DataContext.Provider>
//         );
//     } else {
//         return <React.Fragment>{props.children}</React.Fragment>;
//     }
// }

// export default Data;

///////////////////////////////////////////////////////////////////


// import React, { createContext, useContext } from "react";
// import useCards from "../hooks/useCards";
// import { BusinessCard } from "../utils/types";
// import { useData } from "../hooks/useData";
// import { getData } from "../utils/localStorage";


// export const DataContext = createContext<ReturnType<typeof useData>>(null!);


// function Data(props: React.PropsWithChildren<{}>) {

//     const { data, deleteData, addData } = useData()

//     return (
//         <DataContext.Provider value={{ data, deleteData, addData }}>
//             {props.children}
//         </DataContext.Provider>
//     );
// }

// export default Data;

