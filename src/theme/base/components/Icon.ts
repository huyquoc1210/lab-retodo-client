import type { ThemeOptions } from '@mui/material';

const Icon: ThemeOptions['components'] = {
    MuiIcon: {
        defaultProps: {
            fontSize: 'small',
        },
    },
    MuiSvgIcon: {
        defaultProps: {
            fontSize: 'small',
        },
    },
};

export default Icon;
