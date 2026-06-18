import express from "express";
import { getStats, incrementCall } from "../controllers/statsController.js";
import { verifyToken } from "../middlewares/Auth.js"; 

export const statsRouter = express.Router();

statsRouter.get("/", verifyToken, getStats);
statsRouter.post("/call", verifyToken, incrementCall);
