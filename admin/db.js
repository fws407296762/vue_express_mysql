const mysql = require("mysql");
const config = require("../config");
let options = config.Mysql;

let connection = mysql.createConnection(options);

connection.on("error",function(err){
    let code = err.code;
    errorHandle(code);
    connection.end();
});

connection.connect();

function errorHandle(code){
    if(code === "ER_BAD_DB_ERROR"){
        let queryOptions = {
            sql:"CREATE DATABASE IF NOT EXISTS " + options.database+ " default character set utf8 COLLATE utf8_general_ci;",
            typeCast:false
        };
        let query = connection.query(queryOptions);
        query.on("error",function(err){
            console.log(err);
        })
    }
}

module.exports = connection;

