import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from './Context';

// Header displayed through all the app
// contains a button to redirect to the default page and a signin/signout button
const Header = () => (
  <div className="header">
    <div className="bounds">
      <h1 className="header--logo"><Link to="/">Courses</Link></h1>
      <Consumer>
        { context => (
          <nav>
            <span>Welcome{context.emailAddress === "" ? "" : ` ${context.firstName} ${context.lastName}` }!</span>
            { context.emailAddress !== "" ?
                <Link className="signout" to="/signout">Sign Out</Link>
                :
                <>
                  <Link className="signin" to="/signin">Sign In</Link>
                  <Link className="signup" to="/signup">Sign Up</Link>
                </>
            }
          </nav>
        )}
      </Consumer>
    </div>
  </div>
);

export default Header;
