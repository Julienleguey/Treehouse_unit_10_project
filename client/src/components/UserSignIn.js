import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Consumer } from './Context';


class UserSignIn extends Component {


  constructor() {
    super();
    this.state = {
      prevPage: "/",
      emailAddress: "",
      password: ""
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

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <Consumer>
              { context => {

                  if (context.redirectToPrevPage === true) {
                  console.log("sign in is finished and we know it");
                  console.log(context.redirectToPrevPage);
                  console.log(this.state.prevPage);

                  if (this.state.prevPage === "/") {
                    console.log("using goBack");
                    this.props.history.goBack();
                  } else {
                    console.log("using push");
                    console.log(this.state.prevPage);
                    this.props.history.push(this.state.prevPage);
                  }

                } else {
                  console.log("sign in is not finished");
                  console.log(context.redirectToPrevPage);
                }


                const signin = (e) => {
                  e.preventDefault();

                  if (this.props.location.state) {
                    this.setState({ prevPage: this.props.location.state.from.pathname });
                    console.log("prevPage mis à jour dans UserSignIn");
                  }

                  context.actions.signin(this.state.emailAddress, this.state.password, true);

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

                    <form method="post" onSubmit={signin}>
                      <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.emailAddress} onChange={this.handleChange} /></div>
                      <div><input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={this.handleChange} /></div>
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
