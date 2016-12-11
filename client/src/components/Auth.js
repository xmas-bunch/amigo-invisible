import React, { Component } from 'react';

class Auth extends Component {

  login(e) {
    e.preventDefault();
    if (!this.refs.username.value || !this.refs.password.value) {
      alert('Usuario y password son requeridos');
    } else {
      this.props.login({
          username: this.refs.username.value,
          password: this.refs.password.value
      })
    }
  }

  render() {
    var usersOptions = this.props.users.map(user => {
      return (
        <option key={user.id} value={user.username}>{user.username}</option>
      )
    })
    return (
      <form onSubmit={this.login.bind(this)}>
        <h3> Ingresar </h3>
        <select placeholder="Usuario" ref="username">
          <option>Usuario</option>
          {usersOptions}
        </select>
        <input placeholder="Contraseña" ref="password" type="password" />
        <button type="submit"><img src="http://www.myiconfinder.com/uploads/iconsets/20-20-154dd37596c4ba41b3179bc48db233f8-Christmas.png" height="12px" /></button>
      </form>
    )
  }
}

export default Auth;
