const express = require("express");
const http = require("http");
let router = express.Router();

router.get("/",function(req,res){
    res.render("index")
});

router.get("/demo",function(req,res){
    res.render("demo");
});


module.exports = router;