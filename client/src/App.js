import React, { Component } from 'react';
import axios from 'axios';
import Auth from './components/Auth';
import Gifts from './components/Gifts';
import './App.css';

const serviceUrl = 'http://localhost:3000';

class App extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
      user: null,
      gifts: []
    }
  }

  login(data){
    axios.post(serviceUrl + '/session')
    .then(resp => {
      this.setState({user: resp.data});
      console.log(this.state);
    })
    .catch(err => {
      console.log(err);
    });
  }

  getGifts(){
    axios.get(serviceUrl + '/gifts')
    .then(resp => {
      this.setState({gifts: resp.data});
      console.log(this.state);
    })
    .catch(err => {
      console.log(err);
    });
  }

  getUsers(){
    axios.get(serviceUrl + '/users')
    .then(resp => {
      this.setState({users: resp.data});
      console.log(this.state);
    })
    .catch(err => {
      console.log(err);
    });
  }

  componentDidMount(){
    this.getUsers();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="http://www.aqueduc.org/medias/billets/vignette1_happy_coaching_de_fin_d_annee.gif" className="App-logo" alt="logo" />
          <h2>Aguante la Navidad</h2>
        </div>
        <Auth user={this.state.user} users={this.state.users} login={this.login.bind(this)}/>
        <Gifts gifts={this.state.gifts} />
      </div>
    );
  }
}

export default App;
