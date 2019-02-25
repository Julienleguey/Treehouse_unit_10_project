import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';
import { Consumer } from './Context';


// a private route used by the CreateCourse and UpdateCourse components
// making sure the user is authenticated before accessing these components
// if the user is not authenticated, (s)he is redirected to the sign in page
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Consumer>
    { context => {
      return(
        <Route {...rest} render={ props => context.emailAddress ? (
              <Component {...props} />
            ) : (
              // if the user is redirected to /signin the location (s)he tried to access is passed to UserSignIn
              // in order for the user to be redirected to this specific location after (s)he sucessfully signed in
              <Redirect to={{ pathname: "/signin", state: { from: props.location }}} />
            )
          }
        />
      )
    }}
  </Consumer>
);

export default PrivateRoute;
