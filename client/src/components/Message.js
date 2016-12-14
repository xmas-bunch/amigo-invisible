import React, { Component } from 'react';

const translations = {
    'username and passsword required': 'El nombre de usuario y la password son campos requeridos.',
    'password missing': 'La password y la confirmación de password son campos requiridos.',
    'password mismatch': 'La password y la confirmación de password no encajan.',
    'invalid username or password': 'Password inválida. Te la olvidaste? Ja. Ja.',
    'user updated': 'Tu password fue actualizada. Usá esa misma la próxima vez.',
    'user not found': 'Tu usuario no existe en el siste. Eh... esto no debería pasar',
    'gifts limit reached': 'Ya sacaste el número máximo de regalos, no podés sacar más.',
    'no gifts unassigned': 'Ya no quedan más regalos sin asignar. Eh... esto no debería pasar.'
};

class Message extends Component {

    buildMessage(e) {
        let type;
        let content;

        if (e.response) {
            type = (e.response.status < 300) ? 'info' : 'error';
            content = translations[e.response.data.info];
        } else {
            if (e.message) {
                type = 'error';
                content = e.message;
            } else {
                type = 'info';
                content = e;
            }
        }
        return {
            type: type,
            content: content
        }
    }

    render() {

        if (this.props.message) {
            setTimeout(this.props.deleteMessage, 5000);
            let message = this.buildMessage(this.props.message);
            return (
                <div className={`Message ${message.type}`}>
                    <p>{message.content}</p>
                </div>
            )
        } else {
            return null
        }
    }
}

export default Message;
