import express from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = express.Router()

router.post("/register",register )
router.post("/login",login)
router.post("/logout", (req, res) => {
    res.send("logout")

})
router.post("/register", (req, res) => {
    res.send("Register")

})

export default router