import React, { Component } from 'react';
import { withFirebase } from './firebase/firebaseIndex';

class BaseLogin extends Component {
    constructor(){
        super();
    }

    state = {  }
    render() { 
        return (
            <div id="firebase-auth"> 
            </div>
         );
    }
}
 
const Login = withFirebase(BaseLogin);
export default Login;