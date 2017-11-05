import React from 'react';
import Setting from './Setting';
import './Settings.css';

const Settings = ({title, settings, selected, choose, disabled}) => {
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
        <div class="settings">
            <div class="title">{title}</div>
            <div class="item">
                <div class="gradient_start"></div>
                <div id="scroll-questions-wrapper" class="scroller-wrapper">
                    <div class="scroller">
                        <ul id="questions-list">
                            {settingComponents}
                        </ul>
                    </div>
                </div>
                <div class="gradient_end"><div></div></div>
            </div>
        </div>
    );
}

export default Settings;