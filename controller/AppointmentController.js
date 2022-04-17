import moment from "moment";
import { Controller } from "./Controller.js";
import "moment/locale/pt-br.js";

export class AppointmentController extends Controller {
  constructor(model) {
    super(model);
    moment.locale("pt-br");
  }

  async create(request, response) {
    let element = null;

    let date = moment(request.body.appointmentDate).format("l");

    if (
      (await this.validateAppointmentByDay(request.body.appointmentDate)) &&
      this.validateAppointmentByHour(request.body.appointmentDate)
    ) {
      try {
        element = await this.model.create(request.body);
      } catch (error) {
        response.status(400).send(error.message);
        return;
      }

      response.send(element);
    } else {
      response
        .status(400)
        .send(`Excedido numero máximo de 20 consultas para ${date}.`);
    }
  }

  // TODO
  async validateAppointmentByDay(dateString) {
    // quantos agendamentos existem nesse dia?
    // menos de 20??

    const dateObject = new Date(dateString);

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

    const appointments = await this.model
      .find({
        appointmentDate: {
          $gte: startDate,
          $lt: endDate,
        },
      })
      .lean();

    if (appointments.length < 19) {
      return true;
    }

    return false;
  }

  async validateAppointmentByHour(dateString) {
    // quantos agendamentos existem nessa hora
    // menos de dois??

    const dateObject = new Date(dateString);

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

    const appointments = await this.model
      .find({
        appointmentDate: {
          $gte: startDate,
          $lt: endDate,
        },
      })
      .lean();

    if (appointments.length < 2) {
      return true;
    }

    return false;
  }
}
