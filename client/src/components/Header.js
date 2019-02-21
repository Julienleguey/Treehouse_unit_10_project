import React from 'react';
import { Consumer } from './Context';

const Header = () => (
  <div className="header">
    <div className="bounds">
      <h1 className="header--logo"><a href="/">Courses</a></h1>
      <Consumer>
        { context => (
          <nav><span>Welcome{context.emailAddress === "" ? "" : ` ${context.firstName} ${context.lastName}` }!</span>
          { context.emailAddress !== "" ?
              <a className="signout" href="/signout">Sign Out</a>
              :
              <a className="signout" href="/signin">Sign In</a>
          }
        </nav>
        )}
      </Consumer>
    </div>
  </div>
);

export default Header;
