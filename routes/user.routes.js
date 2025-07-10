import { Router } from "express";
import { registrarUsuario, pageNotfound } from "../src/controllers/user.controller.js";

export const router = Router();

router.post("/register", registrarUsuario);

router.use(pageNotfound);

