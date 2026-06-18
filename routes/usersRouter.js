import express from "express";
import { register, login, getCurrentUser, logout } from "../controllers/usersController.js";
import { verifyToken } from "../middlewares/Auth.js";
export const usersRouter = express.Router();
usersRouter
  .get("/me", verifyToken, getCurrentUser)
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/logout",verifyToken, logout);
