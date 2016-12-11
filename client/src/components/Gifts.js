import React, { Component } from 'react';
import Gift from './Gift';

class Gifts extends Component {
  render() {
    var gifts = this.props.gifts.map(gift => {
      return (
        <Gift key={gift.id} name={gift.name} />
      )
    });
    return (
      <div className='Gifts'>
        <h3> Regalos </h3>
        {gifts}
      </div>
    )
  }
}

export default Gifts;
