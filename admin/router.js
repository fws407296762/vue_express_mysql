const express = require("express");
const http = require("http");
let router = express.Router();

router.get("/",function(req,res){
    res.render("index")
});

router.get("/getNews",function(req,res){
    let options = {
        hostname:"route.showapi.com",
        path:"/109-35?showapi_appid=19547&showapi_sign=8e9d0070ab994b17b8536f94435aa31f",
        method:"GET"
    }
    let request = http.request(options,(_res)=>{
        let c = "";
        _res.setEncoding("utf8");
        _res.on('data',(chunk)=>{
            c += chunk;
        });
        _res.on('end',()=>{
            res.send(c);
            res.end();
        });
    });
    request.on("error",(err)=>{
        res.end(err.message);
    });
    request.end();
});


module.exports = router;