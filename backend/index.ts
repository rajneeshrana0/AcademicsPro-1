import express from "express";

import userRouter from "./routes/userroutes";
import braintwoRouter from "./routes/student/braintworoutes";
import "./config/db";

import cors from "cors";





const app = express();

app.use(express.json());
app.use(cors());

// Router of User
app.use("/api/v1", userRouter);

// brain two app Routes
app.use("/api/v1", braintwoRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
