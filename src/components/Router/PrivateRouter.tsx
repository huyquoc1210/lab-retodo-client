import { Fragment } from 'react';
import type { FCC } from 'types/react';

const PrivateRouter: FCC = (props) => {
    const { children } = props;

    return <Fragment>{children}</Fragment>;
};

export default PrivateRouter;
