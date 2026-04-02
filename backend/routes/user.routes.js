import express from "express";
import { createUser, getUserById, getUsers, loginUser } from "../controllers/UserControllers.js";

const router = express.Router();

router.post("/add-user", createUser);
router.post("/login", loginUser);
router.get("/users", getUsers);
router.get("/user/:id", getUserById);

export default router;