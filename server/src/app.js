import express from "express";
import bodyParser from "body-parser";
import Sumbitrouter from "./routers/submission.router.js";

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api",Sumbitrouter);

export {app};