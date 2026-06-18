import express from "express";
import { verifyToken } from "../middlewares/Auth.js";
import {
  addDonor,
  getDonors,
  updateDonor,
  deleteDonor,
} from "../controllers/donorsController.js";
import { protectAdmin } from "../middlewares/protectAdmin.js";
export const donorsRouter = express.Router();
donorsRouter.post("/add", verifyToken, addDonor);
donorsRouter.get("/", verifyToken, getDonors);
donorsRouter.delete("/:id", verifyToken, protectAdmin, deleteDonor);
donorsRouter.patch("/:id", verifyToken, protectAdmin, updateDonor);
