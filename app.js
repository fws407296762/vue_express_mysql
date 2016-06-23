const express = require("express");
const path = require("path");
let ejs = require("ejs");
let app = express();
let adminRouter = require("./admin/router");
app.set('views',[path.join(__dirname,'/admin/views')]);
app.set("view engine",'ejs');
app.use('/ap',express.static('admin/public'));
app.use('/upload',express.static('admin/upload'));
app.use("/admin",adminRouter);

app.listen(80);