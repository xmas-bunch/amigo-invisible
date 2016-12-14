import React, { Component } from 'react';

class Auth extends Component {

    setUser(e) {
        e.preventDefault();
        this.props.setUser(this.refs.username.value);
    }

    login(e) {
        e.preventDefault();
        this.props.login({
            password: this.refs.password.value
        })
    }

    register(e) {
        e.preventDefault();
        this.props.register({
            password1: this.refs.password1.value,
            password2: this.refs.password2.value
        });
    }

    render() {
        if (this.props.user == null) {
            let userOptions = this.props.users.map(user => {
                return (
                    <option key={user.id} value={user.id}>{user.username}</option>
                )
            });
            return (
                <form onSubmit={this.setUser.bind(this)}>
                    <h3>Seleccione usuario</h3>
                    <select ref="username">
                        {userOptions}
                    </select>
                    <button type="submit">Confirmar usuario</button>
                </form>
            );
        } else if (!this.props.user.hasPassword){
            return (
                <form onSubmit={this.register.bind(this)}>
                    <h3>Registramiento</h3>
                    <input placeholder="Contraseña" ref="password1" type="password" />
                    <input placeholder="Verificación" ref="password2" type="password" />
                    <button type="submit">Registrarse</button>
                </form>
            );
        } else {
            return (
                <form onSubmit={this.login.bind(this)}>
                    <h3>Ingresamiento</h3>
                    <input placeholder="Contraseña" ref="password" type="password" />
                    <button type="submit">Ingresar</button>
                </form>
            );
        }
    }
}

export default Auth;
