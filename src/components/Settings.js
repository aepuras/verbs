import React from 'react';
import Setting from './Setting';
import './Settings.css';

const Settings = ({settings, selected, choose, disabled}) => {
    const settingComponents = settings.map((setting, i) => {
        return (
            <Setting
                key={i}
                setting={setting}
                selected={selected === setting}
                choose={() => choose(setting)}
                disabled={disabled.includes(setting)}
            />
        )
    });

    return (
        <div className="settings">
            {settingComponents}
        </div>
    );
}

export default Settings;