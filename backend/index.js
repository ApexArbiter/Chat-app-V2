import express from "express";
import authRoutes from "./src/routes/auth.route.js";
import { ConnectDB } from "./src/lib/db.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(express.json());



app.use("/api/auth", authRoutes);


ConnectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5001, () => {
  console.log("Server started on port 5001");
});
