import { Fragment } from 'react';
import type { FCC } from 'types/react';

const PublicRouter: FCC = (props) => {
    const { children } = props;

    return <Fragment>{children}</Fragment>;
};

export default PublicRouter;
