import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
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
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';


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
            <Route exact path="/signout" render={ () => <UserSignOut /> } />
            <Route exact path="/notfound" render={ () => <NotFound /> } />

            <Route exact path="/notfound" render={ () => <NotFound /> } />
            <Route exact path="/forbidden" render={ () => <Forbidden /> } />
            <Route exact path="/error" render={ () => <UnhandledError /> } />

            <Route path="*" render={ () => <NotFound /> }/>

          </Switch>

        </div>

      </BrowserRouter>

    );
  }
}

export default App;
