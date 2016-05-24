const express = require("express");
let router = express.Router();

router.get("/",function(req,res){
    res.render("index",{
        title:"这个是首页"
    })
});

module.exports = router;