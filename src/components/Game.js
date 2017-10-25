import React, { Component } from 'react';
import Icon from './Icon.js';
import { ICONS } from '../constants.js';
import classnames from 'classnames';
import '../App.css';
import './Game.css';

class Game extends Component {
    constructor (props) {
        super(props);
        this.state = {
            answer: '',
            started: false,
            verbIndex: 0,
            noOfMistakes: 0,
            showAnswer: false,
            showWrong: false,
        };
        this.renderForm = this.renderForm.bind(this);
    }

    componentWillMount = () => {
        this.timeOuts = [];
    }

    componentWillUnmount = () => {
        this.timeOuts.forEach(clearTimeout);
    }

    toggleGame = () => {
        let value = this.state.started;
        this.setState({
            started: !value
        });
        this.randomizeIndex();
    }

    randomizeIndex = () => {
        this.setState({
            verbIndex: Math.floor(Math.random() * this.props.verbs.length)
        });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    checkAnswer = () => {
        this.setState({ showWrong: false });
        if (this.state.answer === this.props.verbs[this.state.verbIndex][this.props.currentAnswer]) {
            console.log("CORRECT");
            this.setState({
                answer: '',
                noOfMistakes: 0,
                showAnswer: false,
            })
            this.randomizeIndex();
        } else {
            let mistakes = this.state.noOfMistakes;
            this.setState({ noOfMistakes: ++mistakes});
            console.log("WRONG !!!");
            if (this.state.noOfMistakes > 2) {
                this.setState({
                    noOfMistakes: 0,
                    showAnswer: true,
                    answer: this.props.verbs[this.state.verbIndex][this.props.currentAnswer],
                    showWrong: false,
                })
            } else {
                this.timeOuts.push(setTimeout(() => { this.setState({showWrong: true}); } , 200));
            }
        }
    }

    handleOnKeyPress = e => {
        if (e.key === 'Enter') {
            this.checkAnswer();
        }
    }

    renderForm () {
        return (
            <div className="game-form">
                <div className="game-form-row">
                    <div>
                        <div>
                            {this.props.verbs[this.state.verbIndex][this.props.currentQuestion]}
                        </div>
                        <div>
                            <input
                                onChange={this.onChange}
                                onKeyPress={this.handleOnKeyPress}
                                value={this.state.answer}
                                className={classnames({error: !!this.state.showAnswer})}
                                type="text" id="answer" name="answer" />
                            <div className={classnames('game-form-icon', { hidden: !this.state.showWrong })}>
                                <Icon icon={ICONS.WRONG}  color="red" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="button" onClick={this.checkAnswer}>Verify</div>
                </div>
            </div>

        );
    }

    render () {
        return (
            <div>
                <div className="game-start">
                    <div className="button" onClick={this.toggleGame}>
                        { this.state.started ? 'Stop' : 'Start' }
                    </div>
                </div>
                { this.state.started && this.renderForm() }
            </div>
        )
    }
}

export default Game;
