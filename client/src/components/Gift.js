import React, { Component } from 'react';

class Gift extends Component {
    render() {
        return (
            <li className='Gift'>
                {this.props.recipient.username}
            </li>
        )
    }
}


export default Gift;
