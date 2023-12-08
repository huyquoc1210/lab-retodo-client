import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//Layout
import MainLayout from 'layouts/Main';

//Router
import auth from './Auth';
import overview from './Overview';
import account from './Account';
import todo from './Todo';
import start from './Start';
import RouterErrorBoundary from 'pages/Error/RouterErrorBoundary';

const Router = () => {
    const router = createBrowserRouter([
        auth,
        {
            path: '/',
            element: <MainLayout />,
            errorElement: <RouterErrorBoundary />,
            children: [start, overview, account, todo],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router;
