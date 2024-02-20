import { yupResolver } from '@hookform/resolvers/yup';
import LockIcon from '@mui/icons-material/Lock';
import LoadingButton from '@mui/lab/LoadingButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Form from 'components/Form/Form';
import FromSpacing from 'components/Form/FormSpacing';
import FormTextField from 'components/Form/FormTextField';
import PageTitle from 'components/Page/PageTitle';
import config from 'config';
import { useState, type MouseEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouteLink } from 'react-router-dom';
import Validator from 'utils/Validator';
import * as yup from 'yup';
import { signIn } from 'services/auth';
import useAuth from 'hooks/useAuth';

//c1
// interface FormValues {
//     email: string;
//     password: string;
// }

// const schema:ABC<Todo> = yup.object({
//     email: Validator.email().required(),
//     password: Validator.string().required(),
// });

const schema = yup.object({
    username: Validator.string().required(),
    password: Validator.string().required(),
});

//c2
// type FormValues = yup.InferType<typeof schema>;

//c3
type FormValues = ReturnType<typeof schema.validateSync>;

// 1. Viết schema theo 1 interface cụ thể
// 2. InferType cụ thể

const Login = () => {
    const { t } = useTranslation();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const form = useForm<FormValues>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: schema.getDefault(),
    });

    const handleSubmit = async (data: FormValues) => {
        try {
            await login(data);
        } catch (error) {
            console.log(error);
        }
        form.reset();
    };

    useEffect(() => {
        signIn({
            username: 'duclc',
            password: 'Az123456@!',
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <PageTitle title={t('Login')}>
            <Card>
                <CardContent
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <Avatar sx={{ m: 1, bgColor: 'secondary.main' }}>
                        <LockIcon color="primary" fontSize="small" />
                    </Avatar>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                        {t('Retodo')}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Form
                        form={form}
                        onSubmit={handleSubmit}
                        onError={(error) => {
                            console.log(error);
                        }}
                    >
                        <FromSpacing>
                            <FormTextField
                                name="username"
                                required
                                label={t('Username')}
                                autoFocus
                            />
                            <FormTextField
                                name="password"
                                required
                                label={t('PassWord')}
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FromSpacing>
                        <Box sx={{ mt: 3 }}>
                            <LoadingButton
                                fullWidth
                                loading={false}
                                size="medium"
                                type="submit"
                            >
                                {t('Sing In')}
                            </LoadingButton>
                        </Box>
                    </Form>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 3,
                        }}
                    >
                        <Link
                            underline="hover"
                            component={RouteLink}
                            to="/auth/forgot-password"
                            variant="body2"
                        >
                            Forgot password?
                        </Link>
                        <Link
                            underline="hover"
                            component={RouteLink}
                            to="/auth/register"
                            variant="body2"
                        >
                            Don't have an account? Sign Up
                        </Link>
                    </Box>
                </CardContent>
            </Card>
            <CopyRight />
        </PageTitle>
    );
};

const CopyRight = () => {
    return (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="subtitle2">
                {config.TITLE} {''}
                <Typography component="span" variant="body2">
                    is developer by Huy Quốc {''}
                </Typography>
                <Link
                    href="#"
                    target="_bank"
                    variant="inherit"
                    sx={{ color: 'error.main', fontWeight: 'medium' }}
                >
                    Code Solutions
                </Link>
            </Typography>
        </Box>
    );
};

export default Login;
