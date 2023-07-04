import { createContext, useContext, useState } from "react";
import useCards from "../hooks/useCards";
import { BusinessCard } from "../utils/types";
import { useData } from "../hooks/useData";
import { getData } from "../utils/localStorage";

export interface BusinessContextType {
    business: boolean;
    setBusiness: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface LoggedContextType {
    logged: boolean;
    setLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BusinessContext = createContext<BusinessContextType>(null!);
export const LoggedContext = createContext<LoggedContextType>(null!);

function LoginInfo(props: React.PropsWithChildren<{}>) {

    const [business, setBusiness] = useState<boolean>(false);
    const [logged, setLogged] = useState<boolean>(false);

    return (
        <BusinessContext.Provider value={{ business, setBusiness }}>
            <LoggedContext.Provider value={{ logged, setLogged }}>
                {props.children}
            </LoggedContext.Provider>
        </BusinessContext.Provider>
    );
}

export default LoginInfo;
