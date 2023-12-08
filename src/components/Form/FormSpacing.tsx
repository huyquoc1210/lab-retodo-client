import Stack, { type StackProps } from '@mui/material/Stack';

const FromSpacing = (props: StackProps) => {
    const { children, ...rest } = props;

    return (
        <Stack direction="column" spacing={2} {...rest}>
            {children}
        </Stack>
    );
};

export default FromSpacing;
