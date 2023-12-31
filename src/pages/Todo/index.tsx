import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeIcon from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import PageBreadcrumbs from 'components/Page/PageBreadcrumbs2';
import PageWrapper from 'components/Page/PageWrapper';
import { useTranslation } from 'react-i18next';

const Todo = () => {
    const { t } = useTranslation();

    return (
        <PageWrapper title={t('Todo')}>
            <PageBreadcrumbs
                page={t('Todo')}
                items={[
                    {
                        title: t('Home'),
                        href: '/',
                        icon: HomeIcon,
                    },
                ]}
                icon={FormatListBulletedIcon}
            />
            <Box>Todo</Box>
        </PageWrapper>
    );
};

export default Todo;
