import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
const UserContext = React.createContext();

class Provider extends Component {

  constructor() {
    super();
    this.state = {
      loggedUserId: "",
      emailAddress: "",
      password: "",
      readyRedirect: false,
      prevPage: "/",
      firstName: "",
      lastName: "",
      errorMessageSignIn: "",
      isErrorSignIn: false
    };
  }


  componentDidMount() {
    const emailAddress = localStorage.getItem('emailAddress');
    const password = localStorage.getItem('password');
    if (emailAddress) {
      this.signin(emailAddress, password, false, "/");
    }
  }


  signin = (emailAddress, password, readyRedirect, prevPage) => {
    axios.get(`http://localhost:5000/api/users`, {
      auth: {
        username: emailAddress,
        password: password
      }
    }).then( response => {
      this.setState({
        emailAddress: emailAddress,
        password: password,
        loggedUserId: response.data._id,
        readyRedirect: readyRedirect,
        prevPage: prevPage,
        firstName: response.data.firstName,
        lastName: response.data.lastName
      });
      localStorage.setItem('emailAddress', this.state.emailAddress);
      localStorage.setItem('password', this.state.password);
      localStorage.setItem('loggedUserId', this.state.loggedUserId);
    }).then( () => {
      if (this.state.readyRedirect) {
        if (this.state.prevPage === "/") {
          this.props.history.goBack();
        } else {
          this.props.history.push(this.state.prevPage);
        }
      }
    }).catch(error => {
      if (error.response.status === 500) {
        this.props.history.push("/error");
      } else {
        this.setState({
          errorMessageSignIn: error.response.data.message,
          isErrorSignIn: true
        });
      }
    });
  }


  signout = () => {
    Promise.resolve()
      .then( () => {
      this.setState({
        loggedUserId: "",
        emailAddress: "",
        password: "",
        readyRedirect: false,
        prevPage: "/",
        firstName: "",
        lastName: "",
        errorMessageSignIn: "",
        isErrorSignIn: false
      });
      localStorage.clear();
    }).then( () => {
      this.props.history.push("/");
    })
  }


  render() {
    return(
      <UserContext.Provider value={{
        loggedUserId: this.state.loggedUserId,
        emailAddress: this.state.emailAddress,
        password: this.state.password,
        readyRedirect: this.state.readyRedirect,
        prevPage: this.state.prevPage,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        errorMessageSignIn: this.state.errorMessageSignIn,
        isErrorSignIn: this.state.isErrorSignIn,
        actions: {
          signin: this.signin,
          signout: this.signout
        }
      }}>
        { this.props.children }

      </UserContext.Provider>
    );
  }
}

export default withRouter(Provider);
export const Consumer = UserContext.Consumer;
