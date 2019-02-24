import React, { Component } from 'react';
import axios from 'axios';
const UserContext = React.createContext();

export class Provider extends Component {

  constructor() {
    super();
    this.state = {
      loggedUserId: "",
      emailAddress: "",
      password: "",
      redirectToPrevPage: false,
      firstName: "",
      lastName: "",
      errorMessage: "",
      isError: false
    };
  }



  signin = (emailAddress, password, redirectToPrevPage) => {axios.get(`http://localhost:5000/api/users`, {
      auth: {
        username: emailAddress,
        password: password
      }
    }).then( response => {
      console.log("authenticated from index");
      this.setState({
        emailAddress: emailAddress,
        password: password,
        loggedUserId: response.data._id,
        firstName: response.data.firstName,
        lastName: response.data.lastName
      });
      localStorage.setItem('emailAddress', this.state.emailAddress);
      localStorage.setItem('password', this.state.password);
      localStorage.setItem('loggedUserId', this.state.loggedUserId);
    }).then( () => {
      this.setState({
        redirectToPrevPage: redirectToPrevPage
      });
      console.log("state mis à jour dans index (context)");
    }).catch(error => {
      console.log(error.response.data.message);
      this.setState({
        errorMessage: error.response.data.message,
        isError: true
      });
    });
  }


  signout = () => {
    this.setState({
      emailAddress: "",
      password: "",
      redirectToPrevPage: false,
      loggedUserId: "",
      firstName: "",
      lastName: ""
    });
    localStorage.clear();
  }


  componentDidMount() {
    const emailAddress = localStorage.getItem('emailAddress');
    const password = localStorage.getItem('password');
    if (emailAddress) {
      this.signin(emailAddress, password, false);
    }
  }

  render() {
    return(
      <UserContext.Provider value={{
        emailAddress: this.state.emailAddress,
        password: this.state.password,
        redirectToPrevPage: this.state.redirectToPrevPage,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        errorMessage: this.state.errorMessage,
        isError: this.state.isError,
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

export const Consumer = UserContext.Consumer;
