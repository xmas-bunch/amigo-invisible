import React, { Component } from 'react';

class Auth extends Component {

  login(e) {
    this.props.login({
        username: this.refs.username.value,
        password: this.refs.password.value
    })
  }

  setUser(e) {
    this.props.setUser({
        username: this.refs.username.value
    })
  }

  register(e) {
    this.props.register({
        username: this.refs.username.value,
        password1: this.refs.password1.value,
        password2: this.refs.password2.value
    })

  }


  render() {
    var formContent;
    if (this.props.user == null) {
      var userOptions =  this.props.users.map(user => {
        return (
          <option key={user.id} value={user.username}>{user.username}</option>
        )
      });
      formContent = (
        <form>
        <h3>Seleccione usuario</h3>
        <select ref="username">{userOptions}</select>
        <button type="button" onclick={this.setUser.bind(this)}>Confirmar usuario</button>
        </form>
      )
    } else if (!this.props.user.hasPassword){
      formContent =  (
        <form>
        <h3>Registramiento</h3>
        <input placeholder="Contraseña" ref="password1" type="password" />
        <input placeholder="Verificación" ref="password2" type="password" />
        <button type="button" onclick={this.register.bind(this)}>Registrarse</button>
        </form>
      );
    } else {
      formContent = (
        <form>
        <h3>Ingresamiento</h3>
        <input placeholder="Contraseña" ref="password" type="password" />
        <button type="button" onclick={this.login.bind(this)}>Ingresar</button>
        </form>
      )
    }

    return (
      {formContent}
    )
  }
}

export default Auth;
