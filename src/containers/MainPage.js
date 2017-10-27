import React from 'react';
import classnames from 'classnames';
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
            verbs: data[0].items,
            currentVerbsSetIndex: 0,
        }
        console.log(data);
        this.settings = Object.getOwnPropertyNames(data[0].items[0]);
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

    chooseVerbsSet = (verbsSetIndex) => {
        this.setState({
            currentVerbsSetIndex: verbsSetIndex,
            verbs: data[verbsSetIndex].items,
        })
    }

    verbsSetButtons = () => {
        return data.map((item, i) => {
            return (
                <div
                    className={classnames('button', {selected: (i === this.state.currentVerbsSetIndex)})}
                    onClick={() => this.chooseVerbsSet(i)}
                >
                    {item.name}
                </div>
            );
        });
    }

    render() {
        return(
            <div className="main-container">
                <div className="settings-container">
                    <div>
                        { this.verbsSetButtons() }
                    </div>
                    <div>
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
                </div>
                <div className="game-container">
                    <Game
                        verbs={this.state.verbs}
                        currentQuestion={this.state.currentQuestion}
                        currentAnswer={this.state.currentAnswer}
                    />
                </div>
            </div>
        );
    }
}

export default MainPage;
