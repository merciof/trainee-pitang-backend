import { Router } from "express";

import { AppointmentController } from "../controller/AppointmentController.js";
import { appointmentModel } from "../model/appointmentModel.js";

const appointmentRouter = Router();

const appointmentController = new AppointmentController(appointmentModel);

// default CRUD
appointmentRouter.get(
  "/appointment",
  appointmentController.index.bind(appointmentController)
);
appointmentRouter.post(
  "/appointment",
  appointmentController.create.bind(appointmentController)
);
appointmentRouter.get(
  "/appointment/:id",
  appointmentController.read.bind(appointmentController)
);
appointmentRouter.put(
  "/appointment/:id",
  appointmentController.update.bind(appointmentController)
);
appointmentRouter.delete(
  "/appointment/:id",
  appointmentController.delete.bind(appointmentController)
);

// custom methods
appointmentRouter.post(
  "/getAppointmentsByDay",
  appointmentController.getAppointmentsByDay.bind(appointmentController)
);
appointmentRouter.post(
  "/getAppointmentsByHour",
  appointmentController.getAppointmentsByHour.bind(appointmentController)
);
appointmentRouter.post(
  "/getAppointmentsByMonth",
  appointmentController.getAppointmentsByMonth.bind(appointmentController)
);

export { appointmentRouter };
