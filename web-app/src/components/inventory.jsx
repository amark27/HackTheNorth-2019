import React, { Component } from 'react';

class Inventory extends Component {
    
    constructor(props) {
        super(props);
        this.state = { food: [{key: 1, name: "chicken", quantity: "3"}] }
    }

    render() { 
        return (  
            <div className="list">
                <ul>
                    {this.state.food.map((item) => {
                        return (<li key={item.key}>{item.quantity}x {item.name}</li>);
                    })}
                </ul>
            </div>
        );
    }
}
 
export default Inventory;