import React, { Component } from 'react';
import Gift from './Gift';

class Gifts extends Component {

    componentDidMount() {
        this.props.getGifts();
    }

    drawGift() {
        this.props.drawGift();
    }

    logout() {
        this.props.logout();
    }

    render() {
        let gifts = this.props.gifts.map(gift => {
            return (
                <Gift key={gift.id} giver={gift.giver} recipient={gift.recipient}/>
            )
        });
        return (
            <div className='Gifts'>
                <h3> Regalos </h3>
                {gifts}
                <button type="button" onClick={this.drawGift.bind(this)}>Sacar regalo</button>
                <button type="button" onClick={this.logout.bind(this)}>Salir</button>
            </div>
        )
    }
}

export default Gifts;
