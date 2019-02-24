import React, { Component } from 'react';
import { Consumer } from './Context';
import { withRouter } from 'react-router-dom';

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
      errorMessage: []
    };
  }


  createCourse = (e, emailAddress, password) => {

    e.preventDefault();

    axios.post(`http://localhost:5000/api/courses`, {
      title: this.state.title,
      description: this.state.description,
      estimatedTime: this.state.estimatedTime,
      materialsNeeded: this.state.materialsNeeded
    }, {
      auth: {
        username: emailAddress,
        password: password
      },
    }).then( response => {
        this.props.history.push(response.headers.location);
    }).catch( error => {
      console.log(error.response.status);
      if (error.response.status === 400) {
        this.setState({
          isError: true,
          errorMessage: error.response.data.message
        });
      } else {
        this.props.history.push("/error");
      }
    })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value});
  }

  cancel = (e) => {
    e.preventDefault();
    this.props.history.push("/");
  }

  displayErrors = () => {
    const errorsInArray = this.state.errorMessage;
    const errorsDisplayed = errorsInArray.map(error => <li key={ error.toString() } >{ error }</li>);
    return errorsDisplayed;
  }




  render() {


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

          <Consumer>
            { context => {
              return(
                <form method="post" onSubmit={ (e) => this.createCourse(e, context.emailAddress, context.password)}>
                  <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <div>
                        <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                        value={this.state.title} onChange={this.handleChange}/>
                      </div>
                      <p>By Joe Smith</p>
                    </div>
                    <div className="course--description">
                      <div>
                        <textarea id="description" name="description" className="" placeholder="Course description..."
                        value={this.state.description} onChange={this.handleChange}></textarea>
                      </div>
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
                          <div>
                            <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..."
                            value={this.state.materialsNeeded} onChange={this.handleChange}></textarea>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
                  </div>
                </form>
              );
            }}
          </Consumer>
        </div>
      </div>
    );
  }

}


export default withRouter(CreateCourse);
