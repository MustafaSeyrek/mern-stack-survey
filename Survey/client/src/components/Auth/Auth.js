//Giriş ve kayıt sayfası yönetimi

import React from 'react'
import Signin from './Signin';
import Signup from './Signup';
import axios from 'axios';
import store from '../../store/index';
import Toast from '../Toast/Toast';
import './Auth.css';
export default class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'signin',
            showToast: false
        }
    }

    signIn = (email, password) => {
        axios.post('/api/users/login', { email, password }).then(res => {
            if (res.data.success) {
                store.dispatch({
                    type: "login",
                    _id: res.data.user._id,
                    user: res.data.user,
                    token: res.data.token
                });
                this.props.history.push('/dashboard');
            } else {
                this.setState({
                    showToast: true
                });
                setTimeout(() => {
                    this.setState({ showToast: false })
                }, 3000)
            }
        }).catch(er => {
            this.setState({
                showToast: true
            });
            setTimeout(() => {
                this.setState({ showToast: false })
            }, 3000)
        });
    }

    signUp = ({ username, email, password }) => {
        axios.post('/api/users/register', { username, email, password }).then(res => {
            if (res.data.success) {
                this.setState({ tab: 'signin' })
            }
        }).catch(er => {
            console.log(er);
        });
    }

    changeTab = () => {
        this.setState({
            tab: this.state.tab === 'signup' ? 'signin' : 'signup'
        })
    }


    render() {
        let page = this.state.tab === 'signin' ? <Signin signIn={this.signIn} /> : <Signup signUp={this.signUp} />
        return (
            <div className='auth-wrapper'>
                <Toast model={this.state.showToast} message="Hatalı giriş" backgroundColor="#FF4539"/>
                <div className='left'>
                    <img src='https://freesvg.org/img/survey-pic.png'></img>

                </div>

                <div className='right'>
                    <div className='header'> Anket</div>
                    <div className='sub-header'>Anket uygulamamıza hoşgeldiniz</div>
                    {page}
                    <div className='new' onClick={this.changeTab}>{this.state.tab === 'signin' ? "Kayıt olmak için buraya tıklayınız" : "Giriş yapmak için buraya tıklayınız"}</div>

                </div>
            </div>
        )
    }
}