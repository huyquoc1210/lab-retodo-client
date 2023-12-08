import useMediaQuery from "@mui/material/useMediaQuery";
import useSettings from "hooks/useSettings";
import type { FCC } from "types/react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import createAppTheme from "theme";

const ThemeProvider: FCC = (props) => {
    const { children } = props;
    const { paletteMode } = useSettings();

    const prefersDarkMode = useMediaQuery("prefect-color-scheme:dark");
    const defaultMode = prefersDarkMode ? "dark" : "light";

    const theme = useMemo(() => {
        return createAppTheme({
            paletteMode: paletteMode === "default" ? defaultMode : paletteMode,
        });
    }, [paletteMode, defaultMode]);

    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export { ThemeProvider };
