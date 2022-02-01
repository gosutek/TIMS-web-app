# Toll Interoperability Management System(TIMS)
## Overview
TIMS was created as a project for the Software Engineering Course of the [National Technical University of Athens](www.ntua.gr) under the 
[Electrical and Computer Engineering Department](www.ece.ntua.gr). This app serves the purpose of managing the interoperability of toll stations.
## Dependencies
```json
{
    "dependencies": {
        "mysql2": "^2.3.3",
        "sequelize": "^6.12.5",
        "body-parser": "^1.19.1",
        "csv-parser": "^3.0.0",
        "express": "^4.17.2",
        "moment": "^2.29.1"
    },
    "devDependencies": {
        "sequelize-cli": "^6.3.0"
    }
}
```
## How to Use
1. Create database "tims_test"
2. Install dependencies
```
npm run install:dependencies
```
3. Start the app
```
npm run start:server
```
## Documentation
[REST API Documentation](https://documenter.getpostman.com/view/19003492/UVXgKwmZ)
