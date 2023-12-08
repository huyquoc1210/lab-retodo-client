import SettingsContextDispatch from 'contexts/Settings';
import { useContext } from 'react';

const useSettingDispatch = () => {
    const context = useContext(SettingsContextDispatch);

    if (!context) {
        throw new Error('Settings context must be within aProvider');
    }

    return context;
};

export default useSettingDispatch;
