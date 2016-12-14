import React, { Component } from 'react';
import axios from 'axios';
import Auth from './components/Auth';
import Gifts from './components/Gifts';
import './App.css';

class App extends Component {

    constructor(){
        super();
        this.state = {
            users: [],
            user: null,
            gifts: []
        }
    }

    componentDidMount(){
        this.getUsers();
    }

    getUsers(){
        axios.get('/users')
            .then(resp => {
                this.setState({users: resp.data});
                console.log(this.state);
            })
            .catch(err => {
                console.log(err);
                alert(err.response.data.error);
            });
    }

    setUser(id) {
        let user = this.state.users.find(user => {
            return user.id == id;
        });
        user.isLoggedIn = false;
        this.setState({user: user});
    }

    login(data){
        data.username = this.state.user.username;
        axios.post('/session', data)
            .then(resp => {
                resp.data.isLoggedIn = true;
                this.setState({user: resp.data});
            })
            .catch(err => {
                console.log(err);
                alert(err.response.data.error);
            });
    }

    logout() {
        this.setState({user: null});
    }

    register(data) {
        axios.put(`/users/${this.state.user.id}`, data)
            .then(resp => {
                let user = this.state.user;
                user.hasPassword = true;
                user.isLoggedIn = true;
                this.setState({user: user});
            })
            .catch(err => {
                console.log(err);
                alert(err.response.data.error);
            })
    }

    getGifts(){
        axios.get(`users/${this.state.user.id}/gifts`)
            .then(resp => {
                this.setState({gifts: resp.data});
                console.log(this.state.gifts);
            })
            .catch(err => {
                console.log(err);
                alert(err.response.data.error);
            });
    }

    drawGift() {
        axios.post(`users/${this.state.user.id}/gifts`)
            .then(resp => {
                this.getGifts();
            })
            .catch(err => {
                console.log(err);
                alert(err.response.data.error);
            })
    }

    render() {
        let mainComponent;
        if (this.state.user && this.state.user.isLoggedIn) {
            mainComponent = (
                <Gifts
                    gifts={this.state.gifts}
                    getGifts={this.getGifts.bind(this)}
                    drawGift={this.drawGift.bind(this)}
                    logout={this.logout.bind(this)}/>
            );
        } else {
            mainComponent = (
                <Auth
                    user={this.state.user} users={this.state.users}
                    login={this.login.bind(this)}
                    setUser={this.setUser.bind(this)}
                    register={this.register.bind(this)}
                />
            );
        }

        return (
            <div className="App">
              <div className="App-header">
                <img src="http://www.aqueduc.org/medias/billets/vignette1_happy_coaching_de_fin_d_annee.gif" className="App-logo" alt="logo" />
                <h2>Aguante la Navidad</h2>
              </div>
                {mainComponent}
            </div>
        );
    }
}

export default App;
