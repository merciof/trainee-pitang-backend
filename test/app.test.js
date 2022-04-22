import request from "supertest";
import chai from "chai";
import app from "../app.js";

const expect = chai.expect;

// endpoint /api/appointment

describe("GET /api/appointment", function () {
  it("should respond with a 200 status code", async function () {
    const response = await request(app).get("/api/appointment/");
    expect(response.statusCode).to.equal(200);
  });
});

describe("POST /api/appointment with missing data", function () {
  it("should respond with a status code of 400", async function () {
    const requestBody = {};

    const response = await request(app)
      .post("/api/appointment/")
      .send(requestBody);
    expect(response.statusCode).to.equal(400);
  });

  it("should brind an error message", async function () {
    const requestBody = {};

    const response = await request(app)
      .post("/api/appointment/")
      .send(requestBody);
    expect(response.body.message).to.equal("requerido");
  });
});

describe("POST /api/getAppointmentsByDay", function () {
  it("should respond with a 200 status code", async function () {
    const response = await request(app)
      .post("/api/getAppointmentsByDay/")
      .send({ appointmentDate: "2022-03-02T02:00:00.000Z" });
    expect(response.statusCode).to.equal(200);
  });
});

// endpoint /api/getAppointmentsByDay

describe("POST /api/getAppointmentsByDay with missing data", function () {
  it("should respond with a 400 status code", async function () {
    const response = await request(app)
      .post("/api/getAppointmentsByDay/")
      .send({});
    expect(response.statusCode).to.equal(400);
  });

  it("should brind an error message", async function () {
    const requestBody = {};

    const response = await request(app)
      .post("/api/getAppointmentsByDay/")
      .send(requestBody);
    expect(response.body.message).to.equal("requerido");
  });
});

// endpoint /api/getAppointmentsByHour

describe("POST /api/getAppointmentsByHour", function () {
  it("should respond with a 200 status code", async function () {
    const response = await request(app)
      .post("/api/getAppointmentsByHour/")
      .send({ appointmentDate: "2022-03-02T02:00:00.000Z" });
    expect(response.statusCode).to.equal(200);
  });
});

describe("POST /api/getAppointmentsByHour with missing data", function () {
  it("should respond with a 400 status code", async function () {
    const response = await request(app)
      .post("/api/getAppointmentsByHour/")
      .send({});
    expect(response.statusCode).to.equal(400);
  });

  it("should brind an error message", async function () {
    const requestBody = {};

    const response = await request(app)
      .post("/api/getAppointmentsByHour/")
      .send(requestBody);
    expect(response.body.message).to.equal("requerido");
  });
});

// endpoint /api/getAppointmentsByMonth
