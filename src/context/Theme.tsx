import React, { MouseEventHandler, createContext, useState } from "react";
import { CssBaseline, PaletteMode, ThemeProvider, createTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";

export const ThemeContext = createContext<ReturnType<any>>(null!);

function Theme(props: React.PropsWithChildren<{}>) {
    const [themeMode, setThemeMode] = useState<PaletteMode>('light')
    function themeToggle() {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }
    const theme = createTheme({
        palette: { mode: themeMode }
    });

    return (
        <ThemeContext.Provider value={{ themeToggle, themeMode }}>
            <ThemeProvider theme={theme}>
                {props.children}
                <CssBaseline />
                <ToastContainer theme={themeMode} />
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export default Theme;
