import React, { createContext } from "react";
import { View, ViewContextType } from "../utils/types";
export const ViewContext = createContext<ViewContextType>(null!);

function ViewMode(props: React.PropsWithChildren<{}>) {
    const [view, setView] = React.useState<View>('grid');

    const handleView = (event: React.MouseEvent<HTMLElement>, nextView: View) => {
        setView(nextView);
    };
    return (
        <ViewContext.Provider value={{ view, handleView }}>
            {props.children}
        </ViewContext.Provider>
    );
}

export default ViewMode;
