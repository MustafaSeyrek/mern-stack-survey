//Sidebar yönetimi
import React from "react";
import store from "../../store/index";
import './Sidebar.css';
import { NavLink } from "react-router-dom";

export default class Sidebar extends React.Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (store.getState().user) {
            return (
                <div className="sidebar-wrapper">
                    <div className="header">Anket</div>
                    <div className="user">
                        <div className="name">{store.getState().user.username}</div>
                    </div>

                    <div className="links">
                        <NavLink to="/dashboard"><div className="link">Dashboard</div></NavLink>
                        <NavLink to="/my-surveys"><div className="link">Anketlerim</div></NavLink>
                        <NavLink to="/all-surveys"><div className="link">Anketler</div></NavLink>
                        <NavLink to="/create-survey"><div className="link">Anket Oluştur</div></NavLink>
                        <NavLink to="/"><div className="link">Çıkış Yap</div></NavLink>
                    </div>
                </div>
            )
        } else {
            return (
                <div>Yükleniyor...</div>
            )
        }
    }
}
