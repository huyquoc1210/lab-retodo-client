import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeIcon from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

const ICONS = {
    home: HomeIcon,
    account: AccountCircleIcon,
    todo: FormatListBulletedIcon,
    overview: DashboardIcon,
};

interface Breadcrumb {
    title: string;
    href: string;
    icon: keyof typeof ICONS;
}

interface PageBreadcrumbsProps {
    items: Breadcrumb[];
    page: string;
    icon: keyof typeof ICONS;
}

const PageBreadcrumbs = (props: PageBreadcrumbsProps) => {
    const { page, items, icon } = props;

    const Icon = ICONS[icon] || <HomeIcon />;
    // const Icon2 = icon in ICONS ? ICONS[icon] : <HomeIcon />;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Breadcrumbs
                separator={
                    <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                    >
                        /
                    </Typography>
                }
                sx={{
                    [`& > .${breadcrumbsClasses}.ol`]: {
                        alignItems: 'baseline',
                    },
                }}
            >
                {items.map((item, index) => {
                    const { title, href, icon } = item;
                    const Icon = ICONS[icon];

                    return (
                        <Link
                            key={index}
                            underline="hover"
                            component={RouterLink}
                            variant="subtitle2"
                            sx={{
                                color: 'grey.500',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            to={href}
                        >
                            {Icon && <Icon sx={{ mr: 1 }} fontSize="small" />}
                            {title}
                        </Link>
                    );
                })}
                <Typography
                    variant="subtitle2"
                    sx={{
                        color: 'text.secondary',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {Icon && <Icon sx={{ mr: 1 }} fontSize="small" />}
                    {page}
                </Typography>
            </Breadcrumbs>
        </Box>
    );
};

export default PageBreadcrumbs;
