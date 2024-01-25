import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
require("dotenv").config();

let app = express();

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
viewEngine(app);

initWebRoutes(app);

let port = process.env.PORT || 7070;

// port == undefine => port = 7070

app.listen(port, () => {
    // callback
    console.log("backend running: " + port)
})