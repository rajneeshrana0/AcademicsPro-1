import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Monfo = process.env.Mongo_URI  as string;

mongoose.connect(Monfo);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("Connected to MongoDB");
});
