import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom';
import './App.css';
import './css/global.css';


// App components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './components/PrivateRoute';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';


class App extends Component {

  render() {


    return (

      <BrowserRouter>

        <div>
          <Route path="/" render={ () => <Header /> } />


          <Switch>

            <Route exact path="/" render={ () => <Courses /> }/>

            <PrivateRoute exact path="/courses/create" component={CreateCourse} />
            <PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} />

            <Route exact path="/courses/:id" render={ () => <CourseDetail /> }/>
            <Route exact path="/signup" render={ () => <UserSignUp /> } />
            <Route exact path="/signin" render={ () => <UserSignIn /> } /> {/* */}
            {/* <Route exact path={{ pathname: "/signin", state: { from: props.location }}} render={ () => <UserSignIn /> } />
            <Route exact path="/signin" render={ props => <Redirect to={{ pathname: "/signin", state: { from: props.location }}} /> } />*/}
            <Route exact path="/signout" render={ () => <UserSignOut /> } />
            <Route path="*" render={ () => <Redirect to="/woopsie" /> }/>

          </Switch>

        </div>

      </BrowserRouter>

    );
  }
}

export default App;
