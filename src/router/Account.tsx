import LazyRouter from 'components/Router/LazyRouter';
import Paths from 'constants/paths';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy component
const Account = LazyRouter(lazy(() => import('pages/Account')));
console.log(Account);

const account: RouteObject = {
    path: Paths.account.route,
    element: <Account />,
    children: [],
};

export default account;
