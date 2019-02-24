import React from 'react';
import { Consumer } from './Context';


const SignOut = () => (
  <Consumer>
    { context => {
      context.actions.signout();
    }}
  </Consumer>

);

export default SignOut;
