//Sonuç gösterimi
import React from 'react';
import axios from 'axios';
import qs from 'qs';

import Sidebar from '../Sidebar/Sidebar';
import './ViewResults.css';

export default class ViewResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            survey: null
        }
    }

    componentDidMount() {
        if (!localStorage.getItem("_ID")) {
            this.props.history.push('/');
            localStorage.clear();
        } else {
            let id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id;
            if (!id) {
                this.props.history.push('/');
            } else {
                axios.get('/api/surveys/results/' + id).then(res => {
                    this.setState({ result: res.data.result, survey: res.data.survey})
                    
                })
            }
        }
    }

    getBorderLeft = idx => {
        if (this.state.result.answers[idx]) {
            return '5px solid green';
        } else {
            return '5px solid red';
        }
    }

    getResult = () => {
        let len = this.state.result.answers.length;
        let right = this.state.result.answers.filter(ans => ans === true);
        return (100 * (right.length / len)) + '%';
    }
    
    render() {
        return (
            <div className="view-results-wrapper">
                <div>
                    <Sidebar />
                </div>
                {(this.state.survey && this.state.result) && 
                    <div className="body">
                        <div className="header">
                        {this.state.survey.name} İsimli Anketin Sonuçları 
                        </div>
                        <div className="survey-data">
                            <div className="right">
                                <div className="others">Toplam cevaplanma sayısı: {this.state.survey.results.length}</div>
                            </div>
                        </div>
                       
                        <div className="answers"> 
                        Sorular:
                            {this.state.survey.questions.map((q, idx) => (
                                <div key={idx} className="answer" style={{borderLeft: this.getBorderLeft(idx)}}>
                                    <div>{q.questionName}</div>
                                </div> 
                            ))}
                        </div>
                        <div className="answers"> 
                        Cevaplar:
                            {this.state.result.answers.map((q, idx) => (
                                <div key={idx} className="answer" style={{borderLeft: this.getBorderLeft(idx)}}>
                                    <div>{q}</div>
                                </div> 
                            ))}
                        </div>
                    </div>
                }
            </div>
        )
    }
}