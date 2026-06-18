import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { usersRouter } from "../routes/usersRouter.js";
import { donorsRouter } from "../routes/donorsRouter.js";
import { statsRouter } from "../routes/statsRouter.js";

dotenv.config();

const app = express();

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URL);
  isConnected = true;
  console.log("Mongo DB connected");
};

app.use(cors({
  origin: "https://nabdel3taa.vercel.app",
  credentials: true
}));
app.use(express.json());


app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use("/api/users", usersRouter);
app.use("/api/donors", donorsRouter);
app.use("/api/stats", statsRouter);

export default app; 