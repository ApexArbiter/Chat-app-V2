import express from "express";
import { register } from "../controllers/auth.controller.js";

const router = express.Router()

router.post("/register",register )
router.post("/login", (req, res) => {
    res.send("login")

})
router.post("/logout", (req, res) => {
    res.send("logout")

})
router.post("/register", (req, res) => {
    res.send("Register")

})

export default router