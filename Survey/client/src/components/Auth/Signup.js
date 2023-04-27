//kayıt sayfası
import React from 'react'

export default class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <div className='sign-in-wrapper'>
                <div className="form">
                    <div className='input-wrapper'>
                        <input className='input' type='text' placeholder='Kullanıcı Adı' value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
                    </div>
                    <div className='input-wrapper'>
                        <input className='input' type='email' placeholder='Mail' value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                    </div>
                    <div className='input-wrapper'>
                        <input className='input' type='password' placeholder='Şifre' value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                    </div>
                    <div className='btn' onClick={() => this.props.signUp({ ...this.state })}>Kayıt Ol</div>
                </div>
            </div>
        )
    }
}