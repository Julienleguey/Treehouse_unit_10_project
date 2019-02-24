import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Consumer } from './Context';

import axios from 'axios';


// Il y a 2 types d'erreur quand on sign up
// 1. erreur sur le formatage du password (pas de password ou confirmPassword doesn't match) : les messages sont créés ici
// 2. erreur sur le post du password (emailAddress mal formatée ou déjà existante, et firstName et lastName non tapés) : les messages sont renvoyés par le serveur
// Il faut collecter tous les messages d'erreur avant de renvoyer isError: true

class UserSignUp extends Component {

  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
      isError: false,
      errorMessage: ""
    };
  }


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value});
  }


  cancel = (e) => {
    e.preventDefault();
    this.props.history.push("/");
  }

  render() {

    return(
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
            <Consumer>
              { context => {

                const signup = (e) => {
                  e.preventDefault();

                  if (this.state.password.length === 0) {
                    this.setState({
                      // isError: true,
                      errorMessage: "Password must contains at least 1 character!"
                    });
                  } else if (this.state.password !== this.state.confirmPassword) {
                    this.setState({
                      // isError: true,
                      errorMessage: "Password and Confirm Password do not match!"
                    });
                  }
                  // else  {
                  //   e.persist();

                    axios.post(`http://localhost:5000/api/users`, {
                      firstName: this.state.firstName,
                      lastName: this.state.lastName,
                      emailAddress: this.state.emailAddress,
                      password: this.state.password
                    }).then( response => {
                      context.actions.signin(this.state.emailAddress, this.state.password);
                    }).catch(error => {
                      this.setState({
                        // isError: true,
                        errorMessage: error.response.data.message
                      });
                    })
                  // }
                }

                const displayErrors = () => {
                  const errorsInArray = this.state.errorMessage;
                  let errorsDisplayed = "";
                  if (Array.isArray(errorsInArray)) {
                    errorsDisplayed = errorsInArray.map(error => <li key={error.toString()}>{error}</li>);
                  } else {
                    errorsDisplayed = <li>{this.state.errorMessage}</li>;
                  }
                  return errorsDisplayed;
                }

                if (context.emailAddress) {
                  return(
                    <div>
                      <p>You are logged in!</p>
                    </div>
                  );
                } else {
                  return(
                        <>
                        {this.state.isError ?

                          <div>
                            <h2 className="validation--errors--label">Validation errors</h2>
                            <div className="validation-errors">
                              <p>{displayErrors()}</p>
                            </div>
                          </div>

                        : null }
                        <div>
                          <form method="post" onSubmit={signup}>
                            <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} /></div>
                            <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} /></div>
                            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.emailAddress} onChange={this.handleChange} /></div>
                            <div><input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={this.handleChange} /></div>
                            <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleChange} /></div>
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


export default withRouter(UserSignUp);
