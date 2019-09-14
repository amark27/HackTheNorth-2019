import React from 'react';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';

const Inventory = (props) => {
    console.log("food: " + props.objects);
    return (
        <div className="container custom-container">
            <h1>Fridge Inventory</h1>  
            <Fade in={true} timeout="1000">
                <div className="list">
                    <ul>
                        {!!(props.objects) ? props.objects.map((item) => {
                            return (<li key={item.key}>{item.quantity}x {item.name}</li>);
                        }) : ""}
                    </ul>
                </div>
            </Fade>
        </div>
    );
    
}

Inventory.propTypes = {
    objects: PropTypes.shape({
        key: PropTypes.number,
        item: PropTypes.string,
        quantity: PropTypes.number
    })
}

export default Inventory;