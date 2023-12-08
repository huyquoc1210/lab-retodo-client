import Box from '@mui/material/Box';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import type { ElementType } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface Breadcrumb {
    title: string;
    href: string;
    icon: ElementType;
}

interface PageBreadcrumbsProps {
    items: Breadcrumb[];
    page: string;
    icon: ElementType;
}
// ReactNode:
// ReactElement:
// ElementType:

const PageBreadcrumbs = (props: PageBreadcrumbsProps) => {
    const { page, items, icon: Icon } = props;

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
                    const { title, href, icon: Icon } = item;
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
