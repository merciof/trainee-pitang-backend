import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, " is a required value."] },
    appointmentDate: { type: Date, required: [true, " is a required value."] },
    birthDay: { type: Date, required: [true, " is a required value."] },
    accomplished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("appointment", appointmentSchema);

export { appointmentModel };
