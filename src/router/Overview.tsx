import LazyRouter from 'components/Router/LazyRouter';
import Paths from 'constants/paths';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy component
const Overview = LazyRouter(lazy(() => import('pages/Overview')));
// console.log(Todo);

const overview: RouteObject = {
    path: Paths.overview.route,
    element: <Overview />,
    children: [],
};

export default overview;
