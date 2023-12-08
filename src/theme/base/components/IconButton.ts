import type {} from '@mui/lab/themeAugmentation';
import type { ThemeOptions } from '@mui/material';

const IconButton: ThemeOptions['components'] = {
    MuiIconButton: {
        defaultProps: {
            size: 'small',
        },
    },
};

export default IconButton;
