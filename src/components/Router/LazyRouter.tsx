import LazyLoading from 'components/shared/LazyLoading';
import { Suspense, type lazy } from 'react';
import type { Dict } from 'types/shared';

const LazyRouter = (Component: ReturnType<typeof lazy>) => {
    return (props: Dict) => {
        console.log(props);
        return (
            <Suspense fallback={<LazyLoading />}>
                <Component {...props} />
            </Suspense>
        );
    };
};

export default LazyRouter;
