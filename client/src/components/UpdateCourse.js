import React, { Component } from 'react';

import axios from 'axios';
import { Link, Redirect, withRouter } from 'react-router-dom';

class UpdateCourse extends Component {

  constructor() {
    super();
    this.state = {
      courseId: "",
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      userId: "",
      userFirstName: "",
      userLastName: "",
      userFullName: "",
      isError: false,
      errorMessage: [],
      redirectToCourseDetail: false,
      notFound: false,
      forbidden: false
    };
  }


  componentDidMount() {

    const id = this.props.match.params.id;
    console.log(id);

    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then( response => {
          this.setState({
            courseId: id,
            title: response.data.title,
            description: response.data.description,
            estimatedTime: response.data.estimatedTime,
            materialsNeeded: response.data.materialsNeeded,
            userId: response.data.user._id,
            userFirstName: response.data.user.firstName,
            userLastName: response.data.user.lastName,
            userFullName: `${response.data.user.firstName} ${response.data.user.lastName}`
          });
        }).then( () => {
            if (this.state.userId !== localStorage.getItem('loggedUserId') ) {
              this.props.history.push("/forbidden");
            }
        }).catch ( error => {
          this.props.history.push("/notfound");
        })
  }


  updateCourse = (e) => {
    e.preventDefault();

    const emailAddress = localStorage.getItem('emailAddress');
    const password = localStorage.getItem('password');
    const id = this.props.match.params.id;

    axios.put(`http://localhost:5000/api/courses/${id}`, {
      title: this.state.title,
      description: this.state.description,
      estimatedTime: this.state.estimatedTime,
      materialsNeeded: this.state.materialsNeeded
    }, {
      auth: {
        username: emailAddress,
        password: password
      }
    }).then( () => {
      this.props.history.push(`/courses/${this.state.courseId}`);
    }).catch(error => {
      console.log(error.response.status);
      // ajouter un if pour ne faire cette erreur que dans le cas d'une mauvaise update
      if (error.response.status === 400 ) {
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
    this.props.history.push(`/courses/${this.state.courseId}`)
  }

  displayErrors = () => {
    const errorsInArray = this.state.errorMessage;
    const errorsDisplayed = errorsInArray.map(error => <li key={ error.toString() } >{ error }</li>);
    return errorsDisplayed;
  }

  render() {

    return(
      <div className="bounds course--detail">
        <h1>Update Course</h1>
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
          <form onSubmit={this.updateCourse}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                    value={this.state.title} onChange={this.handleChange}/></div>
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
                        placeholder="Hours" value={this.state.estimatedTime} onChange={this.handleChange} /></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={this.state.materialsNeeded} onChange={this.handleChange}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Update Course</button>
              <button className="button button-secondary" onClick={this.cancel} >Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(UpdateCourse);
