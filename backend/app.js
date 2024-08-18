import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./db/dbConnection.js";
import books from "./routers/bookRoute.js";
import userRoute from "./routers/userRoute.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();
config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();


app.use("/api/user",userRoute)
app.use("/api/books", books);

app.use(errorMiddleware);

export default app;