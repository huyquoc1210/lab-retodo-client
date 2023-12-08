import config from 'config';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import type { FCC } from 'types/react';

interface PageTitleProps {
    title?: string;
}

const PageTitle: FCC<PageTitleProps> = (PageTitleProps) => {
    const { title = config.TITLE, children } = PageTitleProps;

    return (
        <Fragment>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}
        </Fragment>
    );
};

export default PageTitle;
