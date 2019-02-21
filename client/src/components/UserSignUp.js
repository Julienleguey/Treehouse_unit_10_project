import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Consumer } from './Context';

import axios from 'axios';


class UserSignUp extends Component {

  constructor() {
    super();
    this.state = {
      isError: false,
      errorMessage: "",
      redirectToHomePage: false
    };
  }


  cancel = (e) => {
    e.preventDefault();
    this.setState({redirectToHomePage: true});
  }

  render() {

    if (this.state.redirectToHomePage === true) {
      return <Redirect to="/" />
    }

    return(
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
            <Consumer>
              { context => {

                const signup = (e) => {
                  e.preventDefault();

                  if (e.target.password.value !== e.target.confirmPassword.value) {
                    this.setState({
                      isError: true,
                      errorMessage: "Passwords do not match!"
                    });
                  } else if (e.target.password.value.length === 0) {
                    this.setState({
                      isError: true,
                      errorMessage: "Password must contains at least 1 character!"
                    });
                  } else {
                    e.persist();

                    axios.post(`http://localhost:5000/api/users`, {
                      firstName: e.target.firstName.value,
                      lastName: e.target.lastName.value,
                      emailAddress: e.target.emailAddress.value,
                      password: e.target.password.value
                    }).then( response => {
                        context.actions.signin(e.target.emailAddress.value, e.target.password.value);
                    }).catch(error => {
                      this.setState({
                        isError: true,
                        errorMessage: error.response.data.message
                      });
                    })
                  }
                }

                const displayErrors = () => {
                  const errorsInArray = this.state.errorMessage;
                  console.log(errorsInArray);
                  let errorsDisplayed = "";
                  if (Array.isArray(errorsInArray)) {
                    errorsDisplayed = errorsInArray.map(error => <li>{error}</li>);
                  } else {
                    errorsDisplayed = <li>{this.state.errorMessage}</li>;
                  }
                  return errorsDisplayed;
                }

                if (context.emailAddress) {
                  return(
                    <div>
                      <p>You are already logged in! Please sign out before signing up!</p>
                    </div>
                  );
                } else {
                  return(
                        <>
                        {this.state.isError ?

                          <div>
                            <h2 class="validation--errors--label">Validation errors</h2>
                            <div class="validation-errors">
                              <p>{displayErrors()}</p>
                            </div>
                          </div>

                        : null }
                        <div>
                          <form method="post" onSubmit={signup}>
                            <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" /></div>
                            <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" /></div>
                            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" /></div>
                            <div><input id="password" name="password" type="password" className="" placeholder="Password" /></div>
                            <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" /></div>
                            <div className="grid-100 pad-bottom">
                              <button className="button" type="submit">Sign Up</button>
                              <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
                            </div>
                          </form>
                        </div>
                        <p>&nbsp;</p>
                        <p>Already have a user account? <a href="/signin">Click here</a> to sign in!</p>
                        </>
                    );
                  }
                }
              }
            </Consumer>
          </div>
        </div>
    );
  }
}


export default UserSignUp;
