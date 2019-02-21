import React from 'react';
import { Redirect } from 'react-router-dom';
import { Consumer } from './Context';


const SignOut = () => (
  <Consumer>
    { context => {
      context.actions.signout();

      return <Redirect to="/" />
    }}
  </Consumer>

);

export default SignOut;
