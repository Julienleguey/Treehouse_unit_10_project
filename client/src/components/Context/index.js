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
      firstName: "",
      lastName: "",
      errorMessage: "",
      isError: false
    };
  }

  signin = (emailAddress, password) => {axios.get(`http://localhost:5000/api/users`, {
      auth: {
        username: emailAddress,
        password: password
      }
    }).then( response => {
      console.log('Authenticated');
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
    }).catch(error => {
      console.log(error.response.data.message);
      // console.log(error);
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
      firstName: "",
      lastName: ""
    });
    localStorage.clear();
  }


  componentDidMount() {
    const emailAddress = localStorage.getItem('emailAddress');
    const password = localStorage.getItem('password');
    if (emailAddress) {
      this.signin(emailAddress, password);
    }
  }

  render() {
    return(
      <UserContext.Provider value={{
        emailAddress: this.state.emailAddress,
        password: this.state.password,
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
