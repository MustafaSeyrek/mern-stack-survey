//Anketi görüntüle

import React from 'react';
import './ViewSurvey.css';
import qs from 'qs';
import axios from 'axios';

export default class ViewSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            survey: {},
            isLoading: true, 
            isAuthenticated: true, 
            inputVal: ''
        }
    }

    checkAuth = () => {
        if (localStorage.getItem('JWT_PAYLOAD') && localStorage.getItem('_ID')) {
            this.setState({isAuthenticated: true})
        }
    }

    componentDidMount() {
        let id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id;
        this.setState({ id: id });
        this.refreshSurvey();
    }

    refreshSurvey = () => {
        axios.get('/api/surveys/get-survey/' + qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id).then(res => {
            if (res.data) {
                this.setState({isLoading: false, survey: res.data.survey});
                this.checkAuth();
            }
        }).catch(er => {
            console.log(er);
        })
    }

    startSurvey = () => {
        this.props.history.push({ 
            pathname: "/take-survey/" + this.state.id,
            state: {
                survey: this.state.survey
            }
        })
    }


    render() {
        return !this.state.isLoading ? (
            <div className="view-survey">
                {!this.state.isAuthenticated ? <div className="not-auth">You must be logged in to take this survey</div> : 
                <div className="content">
                    <div className="header">
                        {this.state.survey.name}
                    </div>
                    <div className="body">                       
                        <div className="right">
                            <div className="questions-num">{this.state.survey.questions.length} Soru</div>
                            <div className={this.state.survey.createdBy === localStorage.getItem('_ID') ? 'questions-wrapper' : 'questions-wrapper no-scroll'}>
                                {this.state.survey.questions.map((question, idx) => (
                                    <div className="question" key={idx}>
                                        <div>{this.state.survey.createdBy === localStorage.getItem('_ID') ? question.questionName : 'question name'}</div>
                                    </div>
                                ))}
                                {this.state.survey.createdBy !== localStorage.getItem('_ID') ? <div className="hidden"><div>Sadece oluşturan soruları görebilir. Soruları görmek için ankete katılmalısınız.</div></div> : ''}
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <div className="buttons-wrapper">
                            <button onClick={() => this.props.history.goBack()}>Geri Dön</button>
                            <button onClick={this.startSurvey}>Ankete Katıl</button>
                        </div>
                    </div>
                </div>
                }
            </div>
        ) : <h2>Yükleniyor...</h2>
    }
}