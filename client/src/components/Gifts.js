import React, { Component } from 'react';
import Gift from './Gift';

class Gifts extends Component {

    componentDidMount() {
        this.props.getGifts();
    }

    render() {
        let mainContent;
        if (this.props.gifts.length) {
            mainContent = this.props.gifts.map(gift => {
                return (
                    <Gift key={gift.id} giver={gift.giver} recipient={gift.recipient}/>
                )
            });
        } else {
            mainContent = <p>Nadie. Sacá alguno.</p>;
        }
        return (
            <div className='Gifts'>
                <h3>Regalos</h3>
                <p>Le tenés que dar regalos a:</p>
                {mainContent}
                <hr />
                <button type="button" onClick={this.props.drawGift.bind(this)}>Sacar regalo</button>

                <hr />
                <button type="button" onClick={this.props.logout.bind(this)}>Salir</button>
            </div>
        )
    }
}

export default Gifts;
