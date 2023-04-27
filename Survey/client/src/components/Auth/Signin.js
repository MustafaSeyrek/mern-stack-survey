//giriş sayfası
import React from 'react'

export default class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <div className='sign-in-wrapper'>
                <div className="form">
                    <div className='input-wrapper'>
                        <input className='input' type='email' placeholder='Mail' value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                    </div>
                    <div className='input-wrapper'>
                        <input className='input' type='password' placeholder='Şifre' value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                    </div>
                    <div className='btn' onClick={() => this.props.signIn(this.state.email, this.state.password)}>Giriş Yap</div>
                </div>
            </div>
        )
    }
}