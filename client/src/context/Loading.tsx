import React, { createContext, useEffect } from "react";
import { LoadingContextType } from "../utils/types";

export const LoadingContext = createContext<LoadingContextType>(null!);

function Loading(props: React.PropsWithChildren<{}>) {
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        !loading && setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [])

    return (
        <LoadingContext.Provider value={{ loading }}>
            {props.children}
        </LoadingContext.Provider>
    );
}

export default Loading;
