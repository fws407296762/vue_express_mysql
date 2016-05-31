const express = require("express");
const http = require("http");
const querystring = require("querystring");
const connection = require("./db");
let router = express.Router();


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
            c = JSON.parse(c);
            let send = {};
            let code = parseInt(c.showapi_res_code),
                error = c.showapi_res_error;
            if(!code){
                let body = c.showapi_res_body,
                    pagebean = body.pagebean,
                    ret_code = parseInt(body.ret_code),
                    allNum = pagebean.allNum,
                    allPages = pagebean.allPages,
                    contentlist = pagebean.contentlist,
                    currentPage = parseInt(pagebean.currentPage),
                    maxResult = parseInt(pagebean.maxResult);
                
                // connection.query("INSERT INTO news(title,imgurl,content,datatime,type)")
            }
            send['code'] = code;
            send['error'] = error;
            res.send(send);
            res.end();
        });
    });
    request.on("error",(err)=>{
        res.end(err.message);
    });
    request.end();
});

router.get("/getNewsChannel",(req,res)=>{
    let date = new Date();
    let year = date.getFullYear(),
        month = date.getMonth()+1 < 10 ? ('0'+(date.getMonth()+1)) : date.getMonth()+1,
        dates = date.getDate() < 10 ? ('0'+date.getDate()) : date.getDate(),
        hours = date.getHours() < 10 ? ('0'+date.getHours()) : date.getHours(),
        minutes = date.getMinutes() < 10 ? ('0'+date.getMinutes()) : date.getMinutes(),
        seconds = date.getSeconds() < 10 ? ('0'+date.getSeconds()) : date.getSeconds();
    let timestamp = ''+year+month+dates+hours+minutes+seconds;
    
    let options = {
        hostname:"route.showapi.com",
        path:"/109-34?showapi_appid=19547&showapi_sign=8e9d0070ab994b17b8536f94435aa31f&showapi_timestamp="+timestamp,
        method:"GET"
    };
    
    let request = http.request(options,(_res)=>{
        let c = "";
        let send = {};
        _res.on("data",(chunk)=>{
            c += chunk;
        });
        
        _res.on("end",()=>{
            c = JSON.parse(c);
            let code = parseInt(c.showapi_res_code),
                error = c.error;
            if(!code){
                let body = c.body,
                    ret_code = parseInt(c.ret_code),
                    totalNum = parseInt(c.totalNum),
                    channelList = c.channelList;
                connection.query("CREATE TABLE IF NOT EXISTS channel (channelId VARCHAR(255) NOT NULL,channelName VARCHAR(255) NOT NULL);",function(err,result){
                    if(!err){
                        
                    }
                });
                
            }
            send['code'] = code;
            send['error'] = error;
            res.send(c);
            res.end();
        });
    });
    
    request.on("error",(err)=>{
        res.end(err.message);
    });
    
    request.end();
})

module.exports = router;