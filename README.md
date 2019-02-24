# Treehouse_unit_10_project
This project is in 2 parts:
- REST API developed with Express (server side)
- Web client developed with react and react-router


To test this project, follow these steps:
1/ Open a console, and go to this project, then to /api
2/ run "npm install" to install the dependencies of the REST API
3/ run "npm start" to start the server (you can test the server using Postman ( http://localhost:5000 ))
4/ Open another console, and go this project, then to /client
5/ run "npm install" to install the dependencies of the web client
6/ run "npm start" to start the client. It should start itself into your web browser. If nothing happens, open a web browser and go to: http://localhost:3000/


Main technologies and dependencies used for this project:
- cors is used to support cross-origin resource sharing ( https://www.npmjs.com/package/cors )
- basic-auth is used for authentification ( https://www.npmjs.com/package/basic-auth )
- mongo is used for the database ( https://www.npmjs.com/package/mongoose )
- react-create-app was used to initiate the react project
- axios is used for http request ( https://www.npmjs.com/package/axios )
- react-router is used to set up the routes
- React context API is used to manage the global state


Actions a user can perform:
- sign up
- sign in (will be redirect to the previous page after signing in)
- sign out
- display a list of courses (all courses)
- see the details of a course (available to all courses)
- create a course (the user has to be signed in)
- update a course (only if the user is the owner of the course)
- deleting a course (only if the user is the owner of the course)
