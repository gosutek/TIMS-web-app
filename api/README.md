# REST API
## Dependencies
<p align="center">
   <a href="https://www.npmjs.com/package/cors">
       <img src="https://img.shields.io/badge/cors-2.8.5-brightgreen" /></a>
  <a href="https://www.npmjs.com/package/express">
        <img src="https://img.shields.io/badge/express-4.17.2-red" /></a>
  <a href="https://www.npmjs.com/package/moment">
        <img src="https://img.shields.io/badge/moment-2.29.1-blueviolet" /></a>
  </p>
  
## Folder structure
- [Routes](./routes):
  The definition of the different endpoints that the application listens to. It includes the admin and the functional endpoint definitions of the application.

- [Controllers](./controllers):
  Contains the controllers for the application where the main business logic that each endpoint calls is located.

- [Error](./error):
  Contains error handlers for invalid dates,missing params, same operators

The api base url is http://localhost:9103/interoperability/api

#### Documentation
A full documentation of the API is published online at [link](https://documenter.getpostman.com/view/19003492/UVXgKwmZ)
