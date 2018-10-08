import React from 'react';
import classnames from 'classnames';
import data from '../data/verbs';
import Settings from '../components/Settings';
import VerbsGame from '../components/VerbsGame';
import './Verbs.css';

class Verbs extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            currentQuestion: "presens",
            currentAnswer: "preteritum",
            verbs: data[0].items,
            currentVerbsSetIndex: 0,
        }
        this.settings = Object.getOwnPropertyNames(data[0].items[0]);
    }

    chooseQuestion = (setting) => {
        this.setState({
            currentQuestion: setting,
        });
    }

    chooseAnswer = (setting) => {
        this.setState({
            currentAnswer: setting,
        });
    }

    chooseVerbsSet = (verbsSetIndex) => {
        this.setState({
            currentVerbsSetIndex: verbsSetIndex,
            verbs: data[verbsSetIndex].items,
        });
    }

    verbsSetButtons = () => {
        return data.map((item, i) => {
            return (
                <div
                    key={i}
                    className={classnames({active: (i === this.state.currentVerbsSetIndex)})}
                    onClick={() => this.chooseVerbsSet(i)}
                >
                    {item.name}
                </div>
            );
        });
    }

    render() {
        return(
            <div className="container">
                <div className="topNav">
                    { this.verbsSetButtons() }
                </div>
                <Settings
                    title="Question"
                    settings={this.settings}
                    selected={this.state.currentQuestion}
                    choose={this.chooseQuestion}
                    disabled={[this.state.currentAnswer]}
                />
                <Settings
                    title="Answer"
                    settings={this.settings}
                    selected={this.state.currentAnswer}
                    choose={this.chooseAnswer}
                    disabled={[this.state.currentQuestion]}
                />
                <VerbsGame
                    verbs={this.state.verbs}
                    currentQuestion={this.state.currentQuestion}
                    currentAnswer={this.state.currentAnswer}
                />
            </div>
        );
    }
}

export default Verbs;
