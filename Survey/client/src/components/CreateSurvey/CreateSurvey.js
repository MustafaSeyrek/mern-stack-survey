//Anket oluşturma
import React from "react";
import Sidebar from '../Sidebar/Sidebar';
import './CreateSurvey.css';
import Dialog from '../Dialog/Dialog';
import axios from 'axios';
import Toast from "../Toast/Toast";

export default class CreateSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            answers: [],
            name: '',
            addQuestion: false,
            questionName: '',
            showToast:false
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('JWT_PAYLOAD')) {
            this.props.history.push('/');
        }
    }

    saveQuestion = () => {
        let question = {
            answers: this.state.answers,
            questionName: this.state.questionName
        }
        this.setState({
            questions: this.state.questions.concat(question),
            addQuestion: false,
            questionName: '',
            answers: [],
        });
    }

    removeQuestion = (question) => {
        this.setState({
            questions: this.state.questions.filter(ques => ques.questionName !== question.questionName)
        })
    }
    addAnswer = () => {
        this.setState({
            answers: this.state.answers.concat('')
        })
    }

    updateAnswer = (e, i) => {
        let newArr = Object.assign([], this.state.answers);
        newArr[i] = e.target.value;
        this.setState({
            answers: newArr
        })
    }


    saveSurvey = () => {
        let survey = {
            name: this.state.name,
            questions: this.state.questions
        }
        axios.post('/api/surveys/create', { survey, createdBy: localStorage.getItem('_ID') }).then(res => {
            if (res.data.success) {
                this.setState({
                    questions: [],
                    answers: [],
                    showToast: true
                });
                setTimeout(() => {
                    this.setState({ showToast: false });
                }, 3000);
            }
        }).catch(er => {
            console.error(er);
        })
    }


    render() {
        return (
            <div className="create-survey-wrapper">
                <Toast model={this.state.showToast} message="Anket oluşturuldu."/>
                <div>
                    <Sidebar />
                </div>

                <div className="main">
                    <div className="header">Anket Oluştur</div>
                    <div className="form card">
                        <input className="input" onChange={e => this.setState({ name: e.target.value })} value={this.state.name} placeholder="Anket Başlığı" />
                        <br></br>
                        {this.state.questions.map((ques, idx) => (
                            <div className="question" key={idx}>
                                <div>{ques.questionName}</div>
                                <div>Seçenek sayısı: {ques.answers.length}</div>
                                <span className="btn delete" onClick={() => this.removeQuestion(ques)}>Sil</span>
                            </div>
                        ))}

                        <div className="questions">
                            <div className="add-question" onClick={() => this.setState({ addQuestion: true })}>Soru Ekle</div>
                        </div>

                        <span onClick={() => this.saveSurvey()} className="btn save-survey">Anketi Kaydet</span>

                        <Dialog model={this.state.addQuestion}>
                            <div className="new-question-form">
                                <input className="input" placeholder="Soru" value={this.state.questionName} onChange={e => this.setState({ questionName: e.target.value })} />
                                <div>Seçenekler</div>
                                {this.state.answers.map((ans, idx) => (
                                    <div className="answer-form" key={idx}>
                                        <input type="radio" value={this.state.ans} onChange={e => this.setState({ correctAnswer: ans })} name="answer" /> <input className="input" type="text" placeholder="Seçenek" value={this.state.answers[idx]} onChange={e => this.updateAnswer(e, idx)} />
                                    </div>
                                ))}
                                <div className="add-answer" onClick={this.addAnswer}>Seçenek Ekle</div>
                                <div className="btn-wrapper">
                                    <div className="btn" onClick={() => this.setState({ addQuestion: false })}>Kapat</div>
                                    <div className="btn" onClick={this.saveQuestion}>Kaydet</div>
                                </div>
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        )
    }
}