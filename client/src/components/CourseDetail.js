import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';



class CourseDetail extends Component {

  constructor() {
    super();
    this.state = {
      all: [],
      courseId: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      title: "",
      course: "",
      userFirstName: "",
      userLastName: "",
      userFullName: "",
      courseDeleted: false
    };
  }

  componentDidMount() {

    const id = this.props.match.params.id;

    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response =>
        this.setState({
          all: response.data,
          courseId: id,
          description: response.data.description,
          estimatedTime: response.data.estimatedTime,
          materialsNeeded: response.data.materialsNeeded,
          title: response.data.title,
          course: response.data,
          userId: response.data.user._id,
          userFirstName: response.data.user.firstName,
          userLastName: response.data.user.lastName,
          userFullName: `${response.data.user.firstName} ${response.data.user.lastName}`
        })
      );

  }


  deleteCourse = () => {

    const emailAddress = localStorage.getItem('emailAddress');
    const password = localStorage.getItem('password');

    axios.delete(`http://localhost:5000/api/courses/${this.state.courseId}`, {
      auth: {
        username: emailAddress,
        password: password
      }
    }).then(function (response) {
      console.log(response);
    }).then( () => {
      this.setState({ courseDeleted: true })
    }).catch(function (error) {
      console.log(error);
    })
  }



  render() {

    if (this.state.courseDeleted === true) {
      return <Redirect to="/" />
    }

    const description = this.state.description;
    const materialsNeeded = this.state.materialsNeeded;


    return (
      <div>
        <div>
          <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100">
                {localStorage.getItem('loggedUserId') === this.state.userId ?
                <span><a className="button" href={`/courses/${this.state.courseId}/update`}>Update Course</a>
                <a className="button" onClick={this.deleteCourse}>Delete Course</a></span>
                : null}
                <a className="button button-secondary" href="/">Return to List</a></div>
            </div>
          </div>
        </div>

        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.title}</h3>
              <p>By {this.state.userFullName}</p>
            </div>
            <div id="description" className="course--description">
              <ReactMarkdown
                source={description}
                escapeHtml={false}
              />

            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                    <ReactMarkdown
                      source={materialsNeeded}
                      escapeHtml={false}
                    />
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    );
  }
}


export default withRouter(CourseDetail);
