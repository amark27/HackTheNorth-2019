import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

const Button = (props) => {
    return (
        <React.Fragment>
            <BrowserRouter>
                <div className="col-lg-3">
                    <Link to={props.link} className="link">{props.displayName}</Link>
                    <Switch>
                        <Route path={props.link} component={props.component}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </React.Fragment>
    );
}
 
export default Button;