import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import authRouter from "./routes/auth.js";
import apiRouter from "./routes/api.js";
import { DBConnect } from "./dbConnect.js";
import cookieParser from "cookie-parser";
const port = process.env.PORT;
const databaseUrl = process.env.DB_URI.toString();

const app = express();
DBConnect(databaseUrl);

app.use(cors({
  origin: "https://geekhaven-task2.vercel.app", 
  credentials: true,           
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', async (req, res) => {
    res.send("hello");
});
app.use("/auth", authRouter);
app.use("/api" , apiRouter)

app.listen(port, () => {
    console.log("server started at port + " + port);
});