import type { ThemeOptions } from '@mui/material/styles';

import merge from 'lodash/merge';

// Components
import Stack from './Stack';
import Button from './Button';
import Icon from './Icon';
import Global from './Global';
import Link from './Link';
import IconButton from './IconButton';
import TextField from './TextField';

const components: ThemeOptions['components'] = merge(
    {},
    Global,
    Button,
    Stack,
    Icon,
    Link,
    IconButton,
    TextField,
);

export default components;
