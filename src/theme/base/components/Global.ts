import type { ThemeOptions } from '@mui/material';

const Global: ThemeOptions['components'] = {
    MuiCssBaseline: {
        styleOverrides: ({ palette, zIndex }) => ({
            'html': {
                display: 'flex',
                flexDecoration: 'column',
                minHeight: '100%',
                width: '100%',
            },
            'body': {
                display: 'flex',
                flex: 'auto',
                flexDecoration: 'column',
                minHeight: '100%',
                width: '100%',
            },
            '#root': {
                display: 'flex',
                flex: 'auto',
                flexDecoration: 'column',
            },
            '#nprogress': {
                pointerEvent: 'none',
            },
            '#nprogress .bar': {
                position: 'fixed',
                zIndex: zIndex.modal + 1,
                width: '100%',
                height: 3,
                top: 0,
                left: 0,
                backgroundColor: palette.secondary.main,
            },
        }),
    },
};

export default Global;
