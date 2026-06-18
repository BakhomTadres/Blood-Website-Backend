import express from "express";
import { getStats, incrementCall } from "../controllers/statsController.js";

export const statsRouter = express.Router();

statsRouter.get("/", getStats);
statsRouter.post("/call", incrementCall);
