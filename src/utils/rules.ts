import type { RegisterOptions } from 'react-hook-form';

type Rules = {
    [key in 'email' | 'password' | 'confirmPassword']?: RegisterOptions;
};
export const rules: Rules = {
    confirmPassword: {
        required: 'ConfirmPasssword là bắt buộc nhập',
        maxLength: {
            value: 160,
            message: 'Độ dài Password không quá 160 ký tự',
        },
        minLength: {
            value: 8,
            message: 'Độ dài Password tối thiểu là 8 ký tư',
        },
    },
    password: {
        required: 'Passsword là bắt buộc nhập',
        pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            message: 'Password không đúng định dạng',
        },
        maxLength: {
            value: 160,
            message: 'Độ dài Password không quá 160 ký tự',
        },
        minLength: {
            value: 8,
            message: 'Độ dài Password tối thiểu là 8 ký tư',
        },
    },
    email: {
        required: 'Email là bắt buộc nhập',
        pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: 'Email không đúng định dạng',
        },
        maxLength: {
            value: 160,
            message: 'Độ dài Email không quá 160 ký tự',
        },
        minLength: {
            value: 6,
            message: 'Độ dài Email tối thiểu là 6 ký tư',
        },
    },
};
