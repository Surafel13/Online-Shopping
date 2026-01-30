import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controller/UserController.js";

const UserRouter = express.Router();

UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.post("/profile", getUserProfile);
        
export default UserRouter;