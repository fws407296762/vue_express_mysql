const express = require("express");
const path = require("path");
var ejs = require("ejs");
var app = express();

app.set('views',path.join(__dirname,'/views'));
app.set("view engine",'ejs');

app.listen(3000);

app.get("/",function(req,res){
    res.render("index",{
        title:"这个是首页"
    })
})