//Kendine ailt anketler

import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import './MySurveys.css';

export default class MySurveys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surveys: []
        }
    }

    componentDidMount() {
        axios.get('/api/surveys/my-surveys/' + localStorage.getItem('_ID')).then(res => {
            this.setState({
                surveys: res.data
            })
        })
    }

    takeSurvey = (surveyId) => {
        this.props.history.push('/view-survey?id=' + surveyId);
    }

    render() {
        return (
            <div className="my-surveys-wrapper">
                <div>
                    <Sidebar />
                </div>
                <div className="body">
                    <div className="header-top">Anketlerim</div>
                    <div className="surveys-wrapper">
                        {this.state.surveys.map((survey, idx) => (
                            <div key={idx} className="survey-card card">
                                <div className="survey-name">{survey.name}</div>
                                <div className="questions">{survey.questions.length} Soru</div>
                                <div className="take-survey btn" onClick={() => this.takeSurvey(survey._id)}>Ankete Katıl</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}