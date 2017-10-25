import React from 'react';
import data from '../data/verbs';
import Settings from '../components/Settings';
import Game from '../components/Game';
import './MainPage.css';

class MainPage extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            currentQuestion: "presens",
            currentAnswer: "preteritum",
        }
        this.settings = Object.getOwnPropertyNames(data.verbs[0]);
        this.verbs = data.verbs;
    }

    chooseQuestion = (setting) => {
        this.setState({
            currentQuestion: setting,
        })
    }

    chooseAnswer = (setting) => {
        this.setState({
            currentAnswer: setting,
        })
    }

    render() {
        return(
            <div className="main-container">
                <div className="settings-container">
                    <div className="settings-group">
                        <Settings
                            settings={this.settings}
                            selected={this.state.currentQuestion}
                            choose={this.chooseQuestion}
                            disabled={[this.state.currentAnswer]}
                        />
                        <Settings
                            settings={this.settings}
                            selected={this.state.currentAnswer}
                            choose={this.chooseAnswer}
                            disabled={[this.state.currentQuestion]}
                        />
                    </div>
                </div>
                <div className="game-container">
                    <Game
                        verbs={this.verbs}
                        currentQuestion={this.state.currentQuestion}
                        currentAnswer={this.state.currentAnswer}
                    />
                </div>
            </div>
        );
    }
}

export default MainPage;
