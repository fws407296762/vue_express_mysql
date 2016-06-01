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

let queryOptions = {
   "sql":"SELECT SCHEMA_NAME FROM `information_schema`.`SCHEMATA` where SCHEMA_NAME='vue'"
}
let query = connection.query(queryOptions);
query.on("error",function(err){
    console.log(err);
}).on("result",function(row){
    console.log(row);
}).on("fields",function(fields,index){
    console.log(fields,index);
}).on("end",function(){
    
});

connection.end();

module.exports = connection;



