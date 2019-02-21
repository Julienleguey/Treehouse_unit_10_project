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
          userFirstName: response.data.user.firstName,
          userLastName: response.data.user.lastName,
          userFullName: `${response.data.user.firstName} ${response.data.user.lastName}`
        })
      );

  }


  displayDescription = () => {
    const descriptions = this.state.description;
    if (descriptions) {
      const descriptionSplited = descriptions.split("\n\n");
      const descriptionDisplayed = descriptionSplited.map(description => <p>{description}</p>);
      return descriptionDisplayed;
    } else {
      return "";
    }
  }

  displayMaterials = () => {
    const materials = this.state.materialsNeeded;
    if (materials) {
      const materialSplited = materials.split("\n");
      const materialDisplayed = materialSplited.map(material => {
        if (material) {
          return <li>{ material.replace("* ", "") }</li>
        }
      });
      return materialDisplayed;
    } else {
      return "";
    }
  }


  deleteCourse = () => {

    const email = localStorage.getItem('emailAddress');
    const mdp = localStorage.getItem('password');

    axios.delete(`http://localhost:5000/api/courses/${this.state.courseId}`, {
      auth: {
        username: email,
        password: mdp
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
              <div className="grid-100"><span>
                <a className="button" href={`/courses/${this.state.courseId}/update`}>Update Course</a>
                <a className="button" onClick={this.deleteCourse}>Delete Course</a></span>
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
              {this.displayDescription()}
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
                  <ul>
                    {this.displayMaterials()}
                    <ReactMarkdown
                      source={materialsNeeded}
                      escapeHtml={false}
                    />
                  </ul>
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
