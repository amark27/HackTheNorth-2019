import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container custom-container">
                <Link to="/" className="navbar-brand brand">FridgeFriend</Link>
                <div className="collapse navbar-collapse sub-links">
                    <ul className="navbar-nav">
                        <li><Link to="/Inventory" className="nav-link link">Inventory</Link></li>
                        <li><Link to="/Recipe" className="nav-link link">Recipe</Link></li>
                        <li><Link to="/GroceryList" className="nav-link link">Grocery List</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
     );
}
 
export default NavBar;