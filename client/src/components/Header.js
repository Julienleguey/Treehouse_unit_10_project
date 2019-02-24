import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from './Context';

const Header = () => (
  <div className="header">
    <div className="bounds">
      <h1 className="header--logo"><a href="/">Courses</a></h1>
      <Consumer>
        { context => (
          <nav>
            <span>Welcome{context.emailAddress === "" ? "" : ` ${context.firstName} ${context.lastName}` }!</span>
            { context.emailAddress !== "" ?
                <Link className="signout" to="/signout">Sign Out</Link>
                :
                <Link className="signout" to="/signin">Sign In</Link>
            }
          </nav>
        )}
      </Consumer>
    </div>
  </div>
);

export default Header;
