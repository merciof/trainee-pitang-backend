"use strict";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { DATABASE_URI } from "./config/env.js";
import { appointmentRouter } from "./route/appointmentRouter.js";

mongoose
  .connect(DATABASE_URI)
  .then(console.log("Conectado ao Mongo"))
  .catch((error) => console.log(error.message));

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", appointmentRouter);

const PORT = parseInt(process.env.PORT) || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

export default app;
