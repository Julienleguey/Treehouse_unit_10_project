import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';


console.log(localStorage.getItem('emailAddress'));


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={ props => localStorage.getItem('emailAddress'
      ) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/signin" />
      )
    }
  />

);

export default PrivateRoute;

// state: { from: props.location } // ça doit servir à renvoyer après s'être loggé à l'url qu'on voulait atteindre avant de logger
