import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Consumer } from './Context';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';


class CourseDetail extends Component {

  constructor() {
    super();
    this.state = {
      courseId: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      title: "",
      course: "",
      userFirstName: "",
      userLastName: "",
      userFullName: ""
    };
  }


  // when the component mounts, the course's datas are retrieved
  componentDidMount() {

    const id = this.props.match.params.id;

    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        this.setState({
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
        });
      }).catch( error => {
        console.log(error.response.status);
        if (error.response.status === 500) {
          this.props.history.push("/error");
        } else {
          this.props.history.push("/notfound");
        }
      })
  }


  // method to delete a course (the authenticated user has to be the creator of the course)
  deleteCourse = (emailAddress, password) => {

    axios.delete(`http://localhost:5000/api/courses/${this.state.courseId}`, {
      auth: {
        username: emailAddress,
        password: password
      }
    }).then( () => {
      this.props.history.push("/");
    }).catch( error => {
      if (error.response.status === 500) {
        this.props.history.push("/error");
      } else {
        this.props.history.push("/notfound");
      }
    })
  }



  render() {

    return (
      <div>
        <div>
          <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100">
                  <Consumer>
                    { context => {
                      // only the creator of the course can see the Update and Delete buttons
                      if (context.loggedUserId === this.state.userId) {
                        return (
                          <span>
                            <Link className="button" to={`/courses/${this.state.courseId}/update`}>Update Course</Link>
                            <button className="button" onClick={ () => this.deleteCourse(context.emailAddress, context.password)} >Delete Course</button>
                          </span>
                        );
                      }
                    }}
                  </Consumer>
                <Link className="button button-secondary" to="/">Return to List</Link>
              </div>
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
                source={this.state.description}
                plugins={[breaks]}
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
                      source={this.state.materialsNeeded}
                      plugins={[breaks]}
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
