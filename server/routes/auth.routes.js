import express from "express";

import { login, register } from "../controllers/auth.controller.js";
import { loginValidationRules, registerValidationRules } from "../utils/validators.js";
import { validate } from "../utils/validate.js";

const router = express.Router();

router.post("/register", registerValidationRules(), validate, register);
router.post("/login", loginValidationRules(), validate, login);


export default router;