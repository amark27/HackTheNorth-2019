import React from 'react';
import './styles/style.css';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import Button from './components/button.jsx';
import Inventory from './components/inventory.jsx';

const App = () => {
  return (
    <React.Fragment>
      <Header/>
      <div className="spacer"></div>
      <div className="row navigation-links">
        <Button link="/Inventory" displayName="Inventory" component={Inventory}/>
      </div>
      <Footer/>
    </React.Fragment>
  );
}

export default App;
