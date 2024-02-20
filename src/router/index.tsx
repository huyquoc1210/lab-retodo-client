import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PrivateRouter from 'components/Router/PrivateRouter';

//Layout
import MainLayout from 'layouts/Main';

//Router
import auth from './Auth';
import overview from './Overview';
import account from './Account';
import todo from './Todo';
import start from './Start';
import date from './Date';
import RouterErrorBoundary from 'pages/Error/RouterErrorBoundary';

const Router = () => {
    const router = createBrowserRouter([
        auth,
        {
            path: '/',
            element: (
                <PrivateRouter>
                    <MainLayout />
                </PrivateRouter>
            ),
            errorElement: <RouterErrorBoundary />,
            children: [start, overview, account, todo, date],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router;
