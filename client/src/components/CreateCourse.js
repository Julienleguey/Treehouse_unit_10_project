import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

class CreateCourse extends Component {

  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      isError: false,
      errorMessage: [],
      courseCreated: false,
      headersLocation: "",
      redirectToHomePage: false
    };
  }


  createCourse = (e) => {

    e.preventDefault();

    const emailAddress = localStorage.getItem('emailAddress');
    const password = localStorage.getItem('password');

    axios.post(`http://localhost:5000/api/courses`, {
      title: e.target.title.value,
      description: e.target.description.value,
      estimatedTime: e.target.estimatedTime.value,
      materialsNeeded: e.target.materialsNeeded.value
    }, {
      auth: {
        username: emailAddress,
        password: password
      },
      responseType: 'json'
    }).then( response =>
      this.setState({
        courseCreated: true,
        headersLocation: response.headers.location
      })
    ).catch( error => {
      console.log(error.response.data.message);
      this.setState({
        isError: true,
        errorMessage: error.response.data.message
      })
    })
  }


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value});
  }

  cancel = (e) => {
    e.preventDefault();
    this.setState({redirectToHomePage: true});
  }

  displayErrors = () => {
    const errorsInArray = this.state.errorMessage;
    const errorsDisplayed = errorsInArray.map(error => <li>{error}</li>);
    return errorsDisplayed;
  }




  render() {

    if (this.state.courseCreated === true) {
      return <Redirect to={this.state.headersLocation} />
    }

    if (this.state.redirectToHomePage === true) {
      return <Redirect to="/" />
    }


    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          {this.state.isError ?
            <div>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  {this.displayErrors()}
                </ul>
              </div>
            </div>
          : null
          }

          <form method="post" onSubmit={this.createCourse}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={this.state.title} onChange={this.handleChange}/></div>
                <p>By Joe Smith</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" placeholder="Course description..." value={this.state.description} onChange={this.handleChange}></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" value={this.state.estimatedTime} onChange={this.handleChange}/></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={this.state.materialsNeeded} onChange={this.handleChange}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Create Course</button>
              <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

}


export default CreateCourse;
