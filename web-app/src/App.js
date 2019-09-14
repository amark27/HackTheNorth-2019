import React, {Component} from 'react';
import './styles/style.css';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import { withFirebase } from './components/firebase/firebaseIndex';

class BaseApp extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      objects: []
    }
  }

  componentDidMount(){
    this.props.firebase.getItems(this.addObjects);
    this.props.firebase.listenDBChanges();
  }

  addObjects = (objs) => {
    let numItems = 0;
    let tempArr = [];
    objs.forEach((ele1) => {
      let index = tempArr.findIndex((ele2) => {
        return (ele2.item === ele1);
      });

      if (index !== -1)
        tempArr[index]["quantity"]++;
      else {
        tempArr.push({key: numItems++, item: ele1, quantity: 1})
      }

    });
    console.log(tempArr);
    this.setState({objects: tempArr});
  }

  render(){
    return (
      <React.Fragment>
        <Header objects={this.state.objects}/>
        <div className="container custom-container">
          <div className="spacer"></div>
        </div>
        <Footer/>
      </React.Fragment>
    );
  }
}

const App = withFirebase(BaseApp);

export default App;
