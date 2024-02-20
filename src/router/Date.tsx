import LazyRouter from 'components/Router/LazyRouter';
import Paths from 'constants/paths';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy component
const Date = LazyRouter(lazy(() => import('pages/Date')));
// console.log(Todo);

const date: RouteObject = {
    path: Paths.date.route,
    element: <Date />,
    children: [],
};

export default date;
