import { Router } from "express";

import { AppointmentController } from "../controller/AppointmentController.js";
import { appointmentModel } from "../model/appointmentModel.js";

import { appointmentSchema } from "../validations/appointmentValidation.js";
import { validation } from "../middleware/validationMiddleware.js";

const appointmentRouter = Router();

const appointmentController = new AppointmentController(appointmentModel);

// default CRUD
appointmentRouter.get(
  "/appointment",
  appointmentController.index.bind(appointmentController)
);
appointmentRouter.post(
  "/appointment",
  validation(appointmentSchema),
  appointmentController.create.bind(appointmentController)
);
appointmentRouter.get(
  "/appointment/:id",
  appointmentController.read.bind(appointmentController)
);
appointmentRouter.put(
  "/appointment/:id",
  validation(appointmentSchema),
  appointmentController.update.bind(appointmentController)
);
appointmentRouter.delete(
  "/appointment/:id",
  appointmentController.delete.bind(appointmentController)
);

// custom methods
appointmentRouter.post(
  "/getAppointmentsByDay",
  validation(appointmentSchema),
  appointmentController.getAppointmentsByDay.bind(appointmentController)
);
appointmentRouter.post(
  "/getAppointmentsByHour",
  validation(appointmentSchema),
  appointmentController.getAppointmentsByHour.bind(appointmentController)
);
appointmentRouter.post(
  "/getAppointmentsByMonth",
  validation(appointmentSchema),
  appointmentController.getAppointmentsByMonth.bind(appointmentController)
);

export { appointmentRouter };
