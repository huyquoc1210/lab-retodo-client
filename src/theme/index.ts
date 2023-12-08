import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { PaletteMode } from 'types/theme';
import merge from 'lodash/merge';

// Palette
import base from './base';
import darkTheme from './palette/dark';
import lightTheme from './palette/light';

interface ThemeOptions {
    paletteMode: PaletteMode;
}

const createAppTheme = (option: ThemeOptions) => {
    const { paletteMode } = option;

    const palette = paletteMode === 'light' ? lightTheme : darkTheme;

    const theme = createTheme(merge({}, base, palette));

    console.log(theme);

    return responsiveFontSizes(theme);
};

export default createAppTheme;
