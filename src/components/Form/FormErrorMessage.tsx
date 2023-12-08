import Box from '@mui/material/Box';
import ErrorIcon from '@mui/icons-material/Error';
import Typography from '@mui/material/Typography';

interface FormErrorMessageProps {
    message: string | undefined;
}

const FormErrorMessage = ({ message }: FormErrorMessageProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                mt: '6px',
            }}
        >
            <ErrorIcon />
            <Typography color="error.main" fontSize="14px">
                {message}
            </Typography>
        </Box>
    );
};

export default FormErrorMessage;
