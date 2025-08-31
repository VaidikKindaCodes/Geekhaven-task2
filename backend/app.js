import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import authRouter from "./routes/auth.js";
import apiRouter from "./routes/api.js";
import { DBConnect } from "./dbConnect.js";
import cookieParser from "cookie-parser";
const port = 8081;
const databaseUrl = process.env.DB_URI.toString();
const frontendUrl = process.env.FRONTEND_URL.toString();

const app = express();
DBConnect(databaseUrl);

app.use(cors({
  origin: frontendUrl, 
  credentials: true,           
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', async (req, res) => {
    res.send("hello");
});
app.use("/auth", authRouter);
app.use("/api" , apiRouter)

app.listen(port, () => {
    console.log("server started at port + " + port);
});