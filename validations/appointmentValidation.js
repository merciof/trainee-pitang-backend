import yup from "yup";

const createAppointmentSchema = yup.object({
  name: yup.string().min(3, "  mínimo de 3 caracteres").required("requerido"),
  appointmentDate: yup.date().required("requerido"),
  birthDay: yup.date().required("requerido"),
  accomplished: yup.boolean(),
});

const getAppointmentSchema = yup.object({
  appointmentDate: yup.date().required("requerido"),
});

export { createAppointmentSchema, getAppointmentSchema };
