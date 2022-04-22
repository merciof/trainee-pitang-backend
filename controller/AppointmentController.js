import moment from "moment";
import { Controller } from "./Controller.js";
import "moment/locale/pt-br.js";

export class AppointmentController extends Controller {
  constructor(model) {
    super(model);
    moment.locale("pt-br");
  }

  async create(request, response) {
    let date = moment(request.body.appointmentDate).format("l");

    if (await this.validateAppointmentByHour(request.body.appointmentDate)) {
      if (await this.validateAppointmentByDay(request.body.appointmentDate)) {
        try {
          const appointment = await this.model.create(request.body);
          response.send(appointment);
        } catch (error) {
          response.status(400).send(error.message);
        }
      } else {
        response
          .status(400)
          .send(`Excedido numero máximo de 20 consultas para ${date}.`);
      }
    } else {
      response
        .status(400)
        .send(`Excedido numero máximo de 2 consultas por hora.`);
    }
  }

  /**
   * It generates two date objects with a hour of range
   * @param {Date} dateObject - A javascript Date object
   * @returns {Array} An array containing startDate and endDate
   */
  getStartEndDateByHour(dateObject) {
    const startDate = new Date(
      dateObject.getFullYear(),
      dateObject.getMonth(),
      dateObject.getDate(),
      dateObject.getHours()
    );

    const endDate = new Date(
      dateObject.getFullYear(),
      dateObject.getMonth(),
      dateObject.getDate(),
      dateObject.getHours() + 1
    );
    return [startDate, endDate];
  }

  /**
   * It generates two date objects with a DAY of range
   * @param {Date} dateObject - A javascript Date object
   * @returns {Array} An array containing startDate and endDate
   */
  getStartEndDateByDay(dateObject) {
    const startDate = new Date(
      dateObject.getFullYear(),
      dateObject.getMonth(),
      dateObject.getDate()
    );

    const endDate = new Date(
      dateObject.getFullYear(),
      dateObject.getMonth(),
      dateObject.getDate() + 1
    );

    return [startDate, endDate];
  }

  /**
   * It validates if a given day is ok for a new appointment
   * @param {String} dateString - a string representing a javascript Date
   * @returns {Boolean} if the date is or not valid for a new appointment
   */
  async validateAppointmentByDay(dateString) {
    const dateObject = new Date(dateString);

    const [startDate, endDate] = this.getStartEndDateByDay(dateObject);

    const appointments = await this.getAppointments(startDate, endDate);

    if (appointments.length < 19) {
      return true;
    }

    return false;
  }

  /**
   * It validates if a given HOUR is ok for a new appointment
   * @param {String} dateString - a string representing a javascript Date
   * @returns {Boolean} if the date is or not valid for a new appointment
   */
  async validateAppointmentByHour(dateString) {
    const dateObject = new Date(dateString);

    const [startDate, endDate] = this.getStartEndDateByHour(dateObject);

    const appointments = await this.getAppointments(startDate, endDate);

    if (appointments.length < 2) {
      return true;
    }

    return false;
  }

  async getAppointmentsByDay(request, response) {
    const dateObject = new Date(request.body.appointmentDate);

    const [startDate, endDate] = this.getStartEndDateByDay(dateObject);

    const appointments = await this.getAppointments(startDate, endDate);

    response.send(appointments);
  }

  async getAppointmentsByHour(request, response) {
    const dateObject = new Date(request.body.appointmentDate);

    const [startDate, endDate] = this.getStartEndDateByHour(dateObject);

    const appointments = await this.getAppointments(startDate, endDate);

    response.send(appointments);
  }

  async getAppointmentsByMonth(request, response) {
    const dateObject = new Date(request.body.appointmentDate);

    const startDate = new Date(
      dateObject.getFullYear(),
      dateObject.getMonth(),
      dateObject.getDate()
    );

    const endDate = new Date(
      dateObject.getFullYear(),
      dateObject.getMonth() + 1,
      dateObject.getDate()
    );

    const appointments = await this.getAppointments(startDate, endDate);

    response.send(appointments);
  }

  async getAppointments(startDate, endDate) {
    try {
      const appointments = await this.model
        .find({
          appointmentDate: {
            $gte: startDate,
            $lt: endDate,
          },
        })
        .lean();

      return appointments;
    } catch (error) {
      response.status(400).send(error.message);
    }
  }
}
