# API

This folder contains the api endpoints for the TIMS application.

#### Dependencies
The dependencies of the project are the following and are contained in the package.json file

- express.js
  Used as the main API framework

- moment.js
  Used for date formating and timestamp manipulation.

- csv-parser
  Streaming CSV parser that aims for maximum speed as well as compatibility with the csv-spectrum CSV acid test suite.

- body-parser
  Node.js body parsing middleware. Used for incoming request parsing.

To install the dependencies run `npm install`

#### Folder structure
- /routes
  The definition of the different endpoints that the application listens to. It includes the admin and the functional endpoint definitions of the application.

- /controllers
  Contains the controllers for the application where the main business logic that each endpoint calls is located.

- /utils
  Helper functions for converting to different data formats or reading the csv files.

The api base url is http://localhost:9103/interoperability/api

#### Documentation
A full documentation of the API is published online at https://documenter.getpostman.com/view/19003492/UVXgKwmZ