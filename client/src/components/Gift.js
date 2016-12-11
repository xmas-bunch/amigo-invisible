import React, { Component } from 'react';

class Gift extends Component {
  render() {
    return (
      <li className='Gift'>
        {this.props.name}
      </li>
    )
  }
}


export default Gift;
