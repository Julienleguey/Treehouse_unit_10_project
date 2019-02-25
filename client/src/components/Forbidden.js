import React from 'react';

// Page displayed when the user tries to perform a forbidden action
// i.e. updating a course (s)he is not allowed to update
const Forbidden = () => (
  <div className="bounds">
    <h1>Forbidden</h1>
    <p>Oh oh! You can't access this page.</p>
  </div>
);

export default Forbidden;
