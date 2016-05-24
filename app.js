const express = require("express");
const path = require("path");
let ejs = require("ejs");
let app = express();
let adminRouter = require("./admin/router");
app.set('views',path.join(__dirname,'/views'));
app.set("view engine",'ejs');

app.use("/admin",adminRouter);

app.listen(3000);