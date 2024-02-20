import Box from '@mui/material/Box';
import PageBreadcrumbs from 'components/Page/PageBreadcrumbs';
import PageWrapper from 'components/Page/PageWrapper';
import { useTranslation } from 'react-i18next';
import CreateDate from './CreateDate';

const Date = () => {
    const { t } = useTranslation();

    return (
        <PageWrapper title={t('Date')}>
            <PageBreadcrumbs
                page={t('Date')}
                items={[
                    {
                        title: t('Home'),
                        href: '/',
                        icon: 'home',
                    },
                ]}
                icon="date"
            />
            <Box>
                <CreateDate />
            </Box>
        </PageWrapper>
    );
};

export default Date;
