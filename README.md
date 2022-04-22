# trainee-pitang-backend

[MIT License](./LICENSE) © [Mércio Filho](https://github.com/merciof)

## :bulb: Introduction

This project is a REST API for appointments CRUD and management.

## :tada: Technologies

This project uses the following technologies

- :zap: **NodeJS and Express** -> For a minimalist web server.
- :zap: **Mongoose** -> For document to object mapping.
- :zap: **Yup** -> For request validation.
- :zap: **MomentJS** -> For nice visualization of dates.
- :zap: **Supertest, Mocha and Chai** -> For api endpoints tests.

## :house: Getting started

1. Clone this repo.
2. Install the packages using your favorite package manager ( yarn install or npm install ).
3. Rename the file config/config.example.js to config/config.js, and add the mongodb database URI.
4. Run the app.

## :ticket: Endpoints

CRUD methods:

| HTTP Method |        URL         | Function |
| ----------- | :----------------: | -------: |
| GET         |  api/appointment   |    index |
| GET         | api/appointment/id |     read |
| POST        |  api/appointment   |   create |
| PUT         | api/appointment/id |   update |
| DELETE      | api/appointment/id |   delete |

Management methods:

| HTTP Method |            URL             |               Function |
| ----------- | :------------------------: | ---------------------: |
| POST        |  api/getAppointmentsByDay  |   getAppointmentsByDay |
| POST        | api/getAppointmentsByHour  |  getAppointmentsByHour |
| POST        | api/getAppointmentsByMonth | getAppointmentsByMonth |

Request body example:

```javascript
{"name":"John Doe","birthDay":"2000-08-30T22:00:00.000Z","appointmentDate": "2022-03-02T02:00:00.000Z"}
```
