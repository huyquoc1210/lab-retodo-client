import Paths from 'constants/paths';
import type { ReactNode } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface Section {
    href: string;
    title: ReactNode;
    icon: ReactNode;
}

const sections: Section[] = [
    { title: 'Overview', href: Paths.overview.index, icon: <DashboardIcon /> },
    { title: 'Todo', href: Paths.todo.index, icon: <FormatListBulletedIcon /> },
    {
        title: 'Account',
        href: Paths.account.index,
        icon: <AccountCircleIcon />,
    },
    {
        title: 'Date',
        href: Paths.date.index,
        icon: <CalendarMonthIcon />,
    },
];

export default sections;
