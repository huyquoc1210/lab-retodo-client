import { useEffect } from 'react';

//Router
import Router from 'router';

// Reset css
import CssBaseline from '@mui/material/CssBaseline';

// Config
import config from 'config';

//I18n
import 'locales';

// Fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Error Boundary
import ErrorBoundary from 'pages/Error/ErrorBoundary';

// Providers
import { HelmetProvider } from 'react-helmet-async';
import { SettingsProvider } from 'contexts/Settings';
import { ThemeProvider } from 'contexts/Theme';

function App() {
    useEffect(() => {
        console.log(
            `Retodo (version ${config.VERSION}) - Copyright © 2023 by Huy Quoc`,
        );
    }, []);

    return (
        <HelmetProvider>
            <SettingsProvider>
                <ThemeProvider>
                    <CssBaseline enableColorScheme />
                    <ErrorBoundary>
                        <Router />
                    </ErrorBoundary>
                </ThemeProvider>
            </SettingsProvider>
        </HelmetProvider>
    );
}

export default App;
