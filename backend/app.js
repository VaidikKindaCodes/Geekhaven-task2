import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import authRouter from "./routes/auth.js";
import apiRouter from "./routes/api.js";
import { DBConnect } from "./dbConnect.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
const port = process.env.PORT || 8080;
const databaseUrl = process.env.DB_URI.toString();
const frontendUrl = process.env.FRONTEND_URL.toString();

const app = express();
DBConnect(databaseUrl);

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 20, 
  message: {
    success: false,
    message: "Too many login/register attempts. Please try again later."
  },
  standardHeaders: true, 
  legacyHeaders: false,  
});

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
app.use("/auth",authLimiter, authRouter);
app.use("/api" , apiRouter)

app.listen(port, () => {
    console.log("server started at port + " + port);
});