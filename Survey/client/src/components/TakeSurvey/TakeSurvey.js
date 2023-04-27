//Ankete katılma yönetimi
import React from 'react';
import './TakeSurvey.css';

import $ from 'jquery';

import axios from 'axios';

export default class TakeSurvey extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            survey: {},
            authorized: false,
            answers: [],
            activeQuestionIdx: 0,
            percentage: 0
        }
    }

    componentDidMount() {
        $('#modal-wrapper-survey').hide();
        
        if (this.props.location.state !== undefined) {
            this.setState({ authorized: true });
            this.setState({ survey: this.props.location.state.survey, answers: Array(this.props.location.state.survey.questions.length).fill(0) });
        }
    }

    prevQuestion = () => {
        let newIdx = this.state.activeQuestionIdx;
        newIdx--;
        if (newIdx < 0) return;
        this.setState({ activeQuestionIdx: newIdx });
    }

    nextQuestion = () => {
        let newIdx = this.state.activeQuestionIdx;
        newIdx++;
        if (newIdx === this.state.survey.questions.length) return;
        this.setState({ activeQuestionIdx: newIdx });
    }

    getPercentage = (ans) => {
        let total = 0;
        ans.forEach(answer => {
            if (answer !== 0) {
                total += (1 / this.state.answers.length);
            }
        });
        this.setState({ percentage: total });
    }

    selectAnswer = (ans, idx) => {
        let questions = this.state.survey;
        questions.questions[this.state.activeQuestionIdx].answers.forEach(ans => {
            ans.selected = false;
        });
        questions.questions[this.state.activeQuestionIdx].answers[idx].selected = true;
        let answers = this.state.answers;
        answers[this.state.activeQuestionIdx] = ans.name;
       
        this.setState({ survey: questions, answers: answers });
        this.getPercentage(answers);
    }

    showModal = () => {
        $('#modal-wrapper-survey').fadeIn(300);
    }

    hideModal = () => {
        $('#modal-wrapper-survey').fadeOut(300);
    }

    finishSurvey = () => {
        axios.post("/api/surveys/save-results", {
            currentUser: localStorage.getItem('_ID'),
            answers: this.state.answers,
            surveyId: this.state.survey._id
        }).then(res => {
            if (res.data) {
                this.props.history.push('/view-results?id=' + res.data.resultId);
            }
        })
    }

    render() {
        let { survey, activeQuestionIdx } = this.state;
        return (
            <>
                <div id="modal-wrapper-survey" className="modal-wrapper-survey">
                    <div className="content">
                        <div className="header">Cevaplarınızı göndermek istediğinizden emin misiniz?</div>
                        <div className="buttons-wrapper">
                            <button onClick={this.hideModal}>İptal</button>
                            <button onClick={this.finishSurvey}>Evet</button>
                        </div>
                    </div>
                </div>
                <div className="take-survey-wrapper">
                    {this.state.authorized ?

                        <div className="content">
                            <div className="body">
                                <div className="left">
                                    <div className="question-name">{survey.questions[activeQuestionIdx].questionName}</div>
                                    <div className="question-bubble-wrapper">
                                        {this.state.survey.questions.map((ans, idx) => (
                                            <span onClick={() => this.setState({ activeQuestionIdx: idx })} key={idx} className={this.state.activeQuestionIdx === idx ? 'question-bubble selected-bubble' : this.state.answers[idx] === 0 ? "question-bubble" : 'question-bubble bubble-correct'}>
                                                {idx + 1}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="answers-wrapper">
                                        {survey.questions[activeQuestionIdx].answers.map((ans, idx) => (
                                            <div key={idx} onClick={() => this.selectAnswer(ans, idx)} className={ans.selected === true ? 'selected' : 'answer'}>
                                                {ans.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="footer">
                                <div className="buttons-wrapper">
                                    <button onClick={this.prevQuestion}>Önceki</button>
                                    {this.state.activeQuestionIdx + 1 < this.state.survey.questions.length ? <button onClick={this.nextQuestion}>Sonraki</button> : <button onClick={this.showModal}>Gönder</button>}
                                </div>
                            </div>
                        </div>

                        : <div>Not authorized</div>}
                </div>
            </>
        )
    }
}