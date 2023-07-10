import { MouseEventHandler, createContext, useState } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

type theme = 'light' | 'dark'

export const ThemeContext = createContext<MouseEventHandler<HTMLLabelElement>>(null!);

function Theme(props: React.PropsWithChildren<{}>) {

    const [themeMode, setThemeMode] = useState<theme>('light')

    function themeToggle() {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const theme = createTheme({
        palette: { mode: themeMode }
    });

    return (
        <ThemeContext.Provider value={themeToggle}>
            <ThemeProvider theme={theme}>
                {props.children}
                <CssBaseline />
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export default Theme;
