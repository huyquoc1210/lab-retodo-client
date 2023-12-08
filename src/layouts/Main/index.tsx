import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from './Header';
import Offset from 'components/shared/Offset';

const MainLayout = () => {
    return (
        <Box sx={{ display: 'flex', flex: 'auto' }}>
            <Sidebar />
            <Box
                sx={{
                    display: 'flex',
                    flex: 'auto',
                    maxWidth: 1,
                    flexDirection: 'column',
                }}
            >
                <Header />
                <Box
                    sx={{
                        display: 'flex',
                        flex: 'auto',
                        flexDirection: 'column',
                    }}
                >
                    <Offset />
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default MainLayout;
