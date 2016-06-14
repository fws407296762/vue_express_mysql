const express = require("express");
const http = require("http");
const moment = require("moment");   
let router = express.Router();
const mysqlConnection = require("./mysqlConnection");
const connection = mysqlConnection.connection;
const mysqlOptions = mysqlConnection.mysqlOptions;
router.get("/",function(req,res){
    res.render("index")
});

router.get("/async/*",function(req,res){
    res.render(req.url.substring(1));
});

router.get("/getNews",function(req,res){
    let query = req.query;
    let page = parseInt(query.page)-1 < 0 ? 0 : (parseInt(query.page)-1),
        pageno = parseInt(query.pageno) || 10;
    queryPromise("USE "+mysqlOptions.database).then(function(){
        return Promise.all([queryPromise("SELECT SQL_CALC_FOUND_ROWS * FROM news ORDER BY datetime DESC LIMIT "+(page*10)+", "+(pageno*(page+1))+";"),queryPromise("SELECT FOUND_ROWS();")]);
    }).then(function(result){
        let total = result[1][0]["FOUND_ROWS()"];
         console.log(result[0].map);
        let data = result[0].map(function(item){
            let locale = moment.locale();
            let m = moment(item.datetime).locale(locale);
            let year = m.year(),
                month = m.month() + 1,
                date = m.date(),
                hour = m.hour();
            item.datetime = ""+year+"-"+month+"-"+date;
            return item;
        });
       
        res.send({
            code:0,
            data:data,
            total:total,
            page:page,
            pagination:Math.ceil(total/pageno),
            msg:""
        });
        res.end();
    }).catch(function(err){
        res.send(err);
        res.end();
    })
});

function queryPromise(options){
    return new Promise(function(resovle,reject){
        connection.query(options,function(err,result){
            if(err){
                reject(err);
            }
            resovle(result);
        })
    })
}

module.exports = router;