import type { ThemeOptions } from '@mui/material';

const Stack: ThemeOptions['components'] = {
    MuiStack: {
        defaultProps: {
            direction: 'row',
            spacing: 1,
        },
    },
};

export default Stack;
