import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Consumer } from './Context';


class UserSignIn extends Component {


  constructor() {
    super();
    this.state = {
      redirectToHomePage: false
    };
  }



  cancel = (e) => {
    e.preventDefault();
    console.log("cancellation");
    this.setState({redirectToHomePage: true});
  }




  render() {

    if (this.state.redirectToHomePage === true) {
      return <Redirect to="/" />
    }

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <Consumer>
              { context => {


                const signin = (e) => {
                  e.preventDefault();
                  context.actions.signin(e.target.emailAddress.value, e.target.password.value);
                  console.log(this.props.location.state.from.pathname);
                  this.props.history.push(this.props.location.state.from.pathname);
                }

                if (context.emailAddress) {
                  return (
                    <div>
                      <p>You are logged in!</p>
                    </div>
                  );
                } else {
                  return(
                    <>
                    {context.isError ?

                      <div>
                        <h2 class="validation--errors--label">Validation errors</h2>
                        <div class="validation-errors">
                          <p>{context.errorMessage}</p>
                        </div>
                      </div>

                    : null }
                    <form method="get" onSubmit={signin}>
                      <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" /></div>
                      <div><input id="password" name="password" type="password" className="" placeholder="Password" /></div>
                      <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">Sign In</button>
                        <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
                      </div>
                    </form>
                    </>
                  );
                }


              }}
            </Consumer>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <a href="/signup">Click here</a> to sign up!</p>
        </div>
      </div>
    );
  }
}

export default withRouter(UserSignIn);
