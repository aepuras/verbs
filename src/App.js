import React, { Component } from 'react';
import MainPage from './containers/MainPage';

class App extends Component {
    componentDidMount() {
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, this.isPassive() ? {
            capture: false,
            passive: false
        } : false);
    }
    isPassive() {
        let supportsPassiveOption = false;
        try {
            document.addEventListener("test", null, Object.defineProperty({}, 'passive', {
                get: function () {
                    supportsPassiveOption = true;
                }
            }));
        } catch(e) {}
        return supportsPassiveOption;
    }
    render() {
        return (
            <div className="App">
                <MainPage />
            </div>
        );
    }
}

export default App;
