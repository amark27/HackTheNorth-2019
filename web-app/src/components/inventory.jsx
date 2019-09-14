import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Inventory extends Component {
    
    constructor(props) {
        super(props);
        this.state = { food: this.props.objects }
    }

    // componentDidUpdate(prevState){

    // }

    render() { 
        console.log("food: " +this.state.food);
        return (
            <React.Fragment>
                <h1>Fridge Inventory</h1>  
                <div className="list">
                    <ul>
                        {!!(this.state.food) ? this.state.food.map((item) => {
                            return (<li key={item.key}>{item.quantity}x {item.name}</li>);
                        }) : ""}
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

Inventory.propTypes = {
    objects: PropTypes.shape({
        key: PropTypes.number,
        item: PropTypes.string,
        quantity: PropTypes.number
    })
}

export default Inventory;