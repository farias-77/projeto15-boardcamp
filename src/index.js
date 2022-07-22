import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();

import categoriesRouter from "./routes/categoriesRouter.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(categoriesRouter);




app.listen(process.env.PORT, () => {
    console.log(chalk.magenta("Server is running at port 4000"));
});