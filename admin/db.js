const mysql = require("mysql");
const config = require("../config");
let options = config.Mysql;


let connection = mysql.createConnection(options);
options.database = "vue";
connection.connect();
connection.on("error",function(err){
    console.log(err);
});

// let queryOptions = {
//     sql:"CREATE DATABASE IF NOT EXISTS " + options.database +" default character set utf8 COLLATE utf8_general_ci;"
// }

let sql = {
    "hasDatabase":{
        "sql":"SELECT SCHEMA_NAME FROM `information_schema`.`SCHEMATA` where SCHEMA_NAME='"+options.database+"';"
    },
    "createDatabase":{
        "sql":"CREATE DATABASE IF NOT EXISTS "+options.database+" default character set utf8 COLLATE utf8_general_ci;"  
    },
    "useDatabase":{
        "sql":"USE "+options.database
    },
    "createTableNews":{
        "sql":"CREATE TABLE IF NOT EXISTS news"
                +"("
                + "id INT NOT NULL AUTO_INCREMENT,"
                + "title VARCHAR(255) NOT NULL,"
                + "imgurl VARCHAR(255),"
                + "type INT NOT NULL,"
                + "PRIMARY KEY (id)"    
                +");"
    },
    "createTableChannel":{
        "sql":"CREATE TABLE IF NOT EXISTS channel"
                + "("
                + "channel VARCHAR(200) NOT NULL"
    }
}

queryAsync(sql.hasDatabase).then(function(result){
    let len = result.length;
    if(!len){
        return queryAsync(sq.createDatabase)
    }
}).then(function(result){
    console.log("创建"+options.database+"成功");
    return queryAsync(sql.useDatabase)
}).then(function(result){
    console.log("使用"+options.database+"数据库");
    return Promise.all([
        queryAsync(sql.createTableNews)
    ]);
}).then(function(result){
    console.log(result);
}).catch(function(err){
    console.log(err);
});


function queryAsync(options){
    return new Promise(function(resolve,reject){
        connection.query(options,function(err,result){
            if(err){
                reject(err);
                return false;
            }
            resolve(result);
        });
    })
}

module.exports = connection;



