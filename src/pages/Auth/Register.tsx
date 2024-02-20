import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Form from 'components/Form/Form';
import FromSpacing from 'components/Form/FormSpacing';
import FormTextField from 'components/Form/FormTextField';
import PageTitle from 'components/Page/PageTitle';
import { useEffect, useState, type MouseEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    privacy: boolean;
}

const schema = yup.object({
    firstName: yup.string().required().max(255).trim().default(''),
    lastName: yup.string().required().trim().default(''),
    email: yup.string().email().required().trim().default(''),
    password: yup.string().required().trim().default(''),
    confirmPassword: yup
        .string()
        .required()
        .default('')
        .test({
            name: 'confirmPassword',
            message: 'Mật khẩu không trùng khớp',
            test: (value, context) => {
                const { password } = context.parent;
                if (value && password) {
                    return value === password;
                }
                return true;
            },
        }),
    privacy: yup.boolean().default(false),
});

const Register = () => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    // const [checked, setChecked] = useState<boolean>(false);

    // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setChecked(event.target.checked);
    // };

    const form = useForm<FormValues>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: schema.getDefault(),
    });

    const [password, confirmPassword] = form.watch([
        'password',
        'confirmPassword',
    ]);

    useEffect(() => {
        if (password && confirmPassword) {
            form.trigger('confirmPassword');
        }
    }, [password, confirmPassword, form]);

    const handleSubmit = (data: FormValues) => {
        console.log(data);
        // const { onSubmit } = props;
        // if (onSubmit) {
        //     onSubmit(data);
        // }

        form.reset();
    };

    // const onSubmit = handleSubmit(
    //     (data: FormValues) => {
    //         console.log(data);
    //     },
    //     (data) => {
    //         const password = getValues('password');
    //         console.log(password);
    //     },
    // );

    const checked = form.watch('privacy');

    // // useEffect(() => {}, [checked]);
    // // const password = watch('password');
    // // console.log(password);

    // console.log(errors);

    return (
        <PageTitle title={t('Register')}>
            <Card>
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Avatar>
                        <LockOutlinedIcon color="primary" fontSize="small" />
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
                        <FromSpacing direction="row" sx={{ mb: 2 }}>
                            <FormTextField
                                name="firstName"
                                required
                                label={t('First Name')}
                                autoFocus
                            />
                            <FormTextField
                                name="lastName"
                                required
                                label={t('Last Name')}
                            />
                        </FromSpacing>
                        <FromSpacing>
                            <FormTextField
                                name="email"
                                required
                                label={t('Email')}
                            />
                            <FormTextField
                                name="password"
                                required
                                label={t('Password')}
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
                            <FormTextField
                                name="confirmPassword"
                                required
                                label={t('Confirm Password')}
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        {...form.register('privacy', {
                                            required: 'bắt buộc phải chọn',
                                        })}
                                    />
                                }
                                label={
                                    <Typography variant="body2">
                                        Điều khoản chính sách bảo mật và quyền
                                        riêng tư
                                    </Typography>
                                }
                            />
                            {/* <input
                                type="checkbox"
                                {...register('privacy', {
                                    required: 'bắt buộc phải chọn',
                                })}
                                // onChange={handleChange}
                                // checked={checked}
                            /> */}
                        </FromSpacing>
                        <Box sx={{ mt: 3 }}>
                            <LoadingButton
                                fullWidth
                                loading={false}
                                size="medium"
                                type="submit"
                                disabled={!checked}
                            >
                                {t('Sing In')}
                            </LoadingButton>
                        </Box>
                    </Form>
                </CardContent>
            </Card>
        </PageTitle>
    );
};

export default Register;
