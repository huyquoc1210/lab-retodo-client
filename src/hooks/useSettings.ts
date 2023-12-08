import SettingsContextState from 'contexts/Settings';
import { useContext } from 'react';

const useSettings = () => {
    const context = useContext(SettingsContextState);

    if (!context) {
        throw new Error('Settings context must be within aProvider');
    }

    return context;
};

export default useSettings;
