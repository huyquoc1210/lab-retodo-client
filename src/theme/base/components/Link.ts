import type { ThemeOptions } from '@mui/material';

const Link: ThemeOptions['components'] = {
    MuiLink: {
        defaultProps: {
            underline: 'none',
        },
    },
};

export default Link;
