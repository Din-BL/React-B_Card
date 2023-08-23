import React, { createContext, useEffect } from "react";
import { LoadingContextType } from "../utils/types";
import { useLocation } from "react-router-dom";

export const LoadingContext = createContext<LoadingContextType>(null!);

function Loading(props: React.PropsWithChildren<{}>) {
    const location = useLocation()
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        !loading && setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 800);
    }, [location])

    return (
        <LoadingContext.Provider value={{ loading }}>
            {props.children}
        </LoadingContext.Provider>
    );
}

export default Loading;
