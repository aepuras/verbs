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
            question: '',
            noOfWrongs: 0,
            noOfRights: 0,
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
        let vbIndex = Math.floor(Math.random() * this.props.verbs.length);
        this.setState({
            started: !value,
            verbIndex: vbIndex,
            question: this.randomArrayItem(this.props.verbs[vbIndex][this.props.currentQuestion]),
            noOfWrongs: 0,
            noOfRights: 0,
        });
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevProps.verbs !== this.props.verbs) {
            this.restartGame(true);
        }
        if (prevProps.currentQuestion !== this.props.currentQuestion || prevProps.currentAnswer !== this.props.currentAnswer) {
            this.restartGame(false);
        }
    }

    restartGame = (changeIndex) => {
        let vbIndex = changeIndex ? Math.floor(Math.random() * this.props.verbs.length) : this.state.verbIndex;
        this.setState({
            started: true,
            verbIndex: vbIndex,
            question: this.randomArrayItem(this.props.verbs[vbIndex][this.props.currentQuestion]),
        });
    }

    randomizeHint = () => {
        let hints = this.props.verbs[this.state.verbIndex][this.props.currentAnswer];
        return this.randomArrayItem(hints);
    }

    randomArrayIndex = (arr) => {
        let randomIndex = 0;
        if (arr.length > 1) {
            randomIndex = Math.floor(Math.random() * arr.length);
        }
        return randomIndex;
    }
    randomArrayItem = (arr) => {
        return arr[this.randomArrayIndex(arr)];
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    checkAnswer = () => {
        let verb = this.props.verbs[this.state.verbIndex];
        this.setState({ showWrong: false });
        if (verb[this.props.currentAnswer].includes(this.state.answer)) {
            let currentIndex = this.state.verbIndex;
            let nextIndex = currentIndex >= this.props.verbs.length - 1 ? 0 : currentIndex + 1;
            this.setState({
                answer: '',
                noOfMistakes: 0,
                showAnswer: false,
                verbIndex: nextIndex,
                question: this.randomArrayItem(this.props.verbs[nextIndex][this.props.currentQuestion]),
                noOfRights: this.state.noOfRights + (this.state.showAnswer ? 0 : 1),
            });
        } else {
            let mistakes = this.state.noOfMistakes;
            this.setState({ noOfMistakes: ++mistakes});
            if (this.state.noOfMistakes > 2) {
                this.setState({
                    noOfMistakes: 0,
                    showAnswer: true,
                    answer: this.randomizeHint(),
                    showWrong: false,
                    noOfWrongs: this.state.noOfWrongs + 1,
                })
            } else {
                this.timeOuts.push(setTimeout(() => { this.setState({showWrong: true}); } , 200));
            }
        }
        this.answerInput.focus();
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
                            {this.state.question}
                        </div>
                        <div>
                            <input
                                readOnly={this.state.showAnswer}
                                onChange={this.onChange}
                                onKeyPress={this.handleOnKeyPress}
                                value={this.state.answer}
                                className={classnames({error: !!this.state.showAnswer})}
                                ref={(ip) => this.answerInput = ip}
                                type="text" id="answer" name="answer" />
                            <div className={classnames('game-form-icon', { hidden: !this.state.showWrong })}>
                                <Icon icon={ICONS.WRONG}  color="red" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="wrongStats">{this.state.noOfWrongs}</div>
                    <div className="button" onClick={this.checkAnswer}>Verify</div>
                    <div className="rightStats">{this.state.noOfRights}</div>
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
