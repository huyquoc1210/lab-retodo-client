import type { PaletteOptions } from '@mui/material/styles';
import { neutral } from '../colors';

const palette: PaletteOptions = {
    mode: 'light',
    background: {
        default: neutral[100],
    },
    primary: {
        main: '#3ACDFF', //500
        light: '#88F1FF', //300
        dark: '#1D7AB7', //700
        contrastText: '#ffffff',
    },
    secondary: {
        main: '#CE93D8', //500
        light: '#F3C4F2', //300
        dark: '#834A9B', //700
        contrastText: '#ffffff',
    },
};

export default palette;
