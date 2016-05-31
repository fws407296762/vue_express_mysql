const mysql = require("mysql");
const config = require("../config");
let options = config.Mysql;

let connection = mysql.createConnection(options);
// connection.connect();
connection.on("error",function(err){
    console.log(err);
    var query = connection.query("CREATE DATABASE IF NOT EXISTS vue",function(err,result){
        console.log(err);
    });
})
connection.end();


module.exports = connection;



