import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import sections from './Section';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const { pathname } = useLocation();

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                'width': 240,
                'flexShrink': 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}
            PaperProps={{
                elevation: 3,
            }}
        >
            <Toolbar />
            <Divider />
            <List>
                {sections.map((section, index) => {
                    const { title, href, icon } = section;
                    return (
                        <ListItem key={index} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={href}
                                selected={pathname === href}
                            >
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={title} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
};

export default Sidebar;
