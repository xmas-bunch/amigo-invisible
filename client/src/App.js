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

  setUser(id) {
    var user = this.state.users.find(user => {
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

  register(data) {
    axios.put('/users/' + this.state.user.id, data)
    .then(resp => {
      var user = this.state.user;
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
    axios.get('/gifts')
    .then(resp => {
      this.setState({gifts: resp.data});
      console.log(this.state);
    })
    .catch(err => {
      console.log(err);
      alert(err.response.data.error);
    });
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

  componentDidMount(){
    this.getUsers();
  }

  render() {
    var mainComponent;
    if (this.state.user && this.state.user.isLoggedIn) {
      mainComponent = (
        <Gifts gifts={this.state.gifts} />
      );
    } else {
      mainComponent = (
        <Auth user={this.state.user} users={this.state.users}
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
