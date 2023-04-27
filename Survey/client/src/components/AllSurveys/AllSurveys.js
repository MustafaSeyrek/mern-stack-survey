//Oluşturulan tüm anketler

import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import './AllSurveys.css';
import Toast from '../Toast/Toast';

export default class AllSurveys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surveys: [],
            showToast: false,
            message: ''
        }
    }

    componentDidMount() {
        axios.get('/api/surveys/all-surveys').then(res => {
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
            <div className="all-surveys-wrapper">
                <Toast model={this.state.showToast} message={this.state.message} />
                <div>
                    <Sidebar />
                </div>
                <div className="body">
                    <div className="header-top">Tüm Anketler</div>
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