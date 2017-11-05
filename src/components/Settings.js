import React from 'react';
import Setting from './Setting';
import './Settings.css';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'react-iscroll';

const Settings = ({title, settings, selected, choose, disabled}) => {
    const iScrollOptions = {
            options : {
                scrollX: true,
                scrollY: false,
                bounce: true,
                snap: false,
                mouseWheel: true,
                tap: true
            }
        }
    

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
            <div className="title">{title}</div>
            <div className="item">
                <div className="gradient_start"></div>
                {/* <div id="scroll-questions-wrapper" class="scroller-wrapper"> */}
                <ReactIScroll iScroll={iScroll} options={this.iScrollOptions} className="scroller-wrapper">
                    <div className="scroller">
                        <ul id="questions-list">
                            {settingComponents}
                        </ul>
                    </div>
                </ReactIScroll>
                {/* </div> */}
                <div className="gradient_end"><div></div></div>
            </div>
        </div>
    );
}

export default Settings;