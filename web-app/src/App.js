import React, {Component} from 'react';
import './styles/style.css';
import Header from './components/header.jsx';
import StickyFooter from './components/footer.jsx';
import { withFirebase } from './components/firebase/firebaseIndex';

class BaseApp extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      objects: [],
      recipe: null
    }
  }

  componentDidMount(){
    this.props.firebase.getItems(this.addObjects);
    this.props.firebase.listenDBChanges(this.addObjects);
  }

  setRecipe = (recipe) => {
    this.setState({recipe: recipe});
  }

  addObjects = (objs) => {
    let numItems = 0;
    let tempArr = [];
    objs.forEach((ele1) => {
      let index = tempArr.findIndex((ele2) => {
        return (ele2.name === ele1);
      });

      if (index !== -1)
        tempArr[index]["quantity"]++;
      else {
        tempArr.push({key: numItems++, name: ele1, quantity: 1})
      }

    });
    this.setState({objects: tempArr});
  }

  render(){
    return (
      <React.Fragment>
        <Header objects={this.state.objects} recipe={this.state.recipe} addRecipe={this.setRecipe}/>

        <StickyFooter/>
      </React.Fragment>
    );
  }
}

const App = withFirebase(BaseApp);

export default App;
