import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name é um valor requerido."] },
    appointmentDate: { type: Date },
    birthDay: { type: Date },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("appointment", appointmentSchema);

export default appointmentModel;
