import LazyRouter from 'components/Router/LazyRouter';
import Paths from 'constants/paths';
import AuthLayout from 'layouts/Auth';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

//Lazy components
const Login = LazyRouter(lazy(() => import('pages/Auth/Login')));
const Register = LazyRouter(lazy(() => import('pages/Auth/Register')));

const auth: RouteObject = {
    path: Paths.auth.route,
    element: <AuthLayout />,
    children: [
        {
            path: Paths.auth.login.route,
            element: <Login />,
            children: [],
        },
        {
            path: Paths.auth.register.route,
            element: <Register />,
            children: [],
        },
    ],
};

export default auth;
