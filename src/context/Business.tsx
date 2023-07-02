import { createContext, useContext, useState } from "react";
import useCards from "../hooks/useCards";
import { BusinessCard } from "../utils/types";
import { useData } from "../hooks/useData";
import { getData } from "../utils/localStorage";

export interface BusinessContextType {
    business: boolean;
    setBusiness: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BusinessContext = createContext<BusinessContextType>(null!);

function Business(props: React.PropsWithChildren<{}>) {

    const [business, setBusiness] = useState<boolean>(false);

    return (
        <BusinessContext.Provider value={{ business, setBusiness }}>
            {props.children}
        </BusinessContext.Provider>
    );
}

export default Business;
