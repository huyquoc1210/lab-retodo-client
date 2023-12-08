import Box from '@mui/material/Box';
import PageBreadcrumbs from 'components/Page/PageBreadcrumbs';
import PageWrapper from 'components/Page/PageWrapper';
import { useTranslation } from 'react-i18next';

const Account = () => {
    const { t } = useTranslation();

    return (
        <PageWrapper title={t('Account')}>
            <PageBreadcrumbs
                page={t('Account')}
                items={[
                    {
                        title: t('Home'),
                        href: '/',
                        icon: 'home',
                    },
                ]}
                icon="account"
            />
            <Box>Account</Box>
        </PageWrapper>
    );
};

export default Account;
