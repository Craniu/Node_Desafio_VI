import { Router } from "express";
import { registrarUsuario, pageNotFound, buscarUsuario } from "../src/controllers/user.controller.js";
import { loginUser } from '../src/controllers/auth.controller.js';
import { validaToken } from "../middlewares/validaToken.middleware.js";

export const router = Router();

router.post("/usuarios", registrarUsuario);
router.post("/login", loginUser);
router.get("/usuarios",validaToken, buscarUsuario)

router.use(pageNotFound);

