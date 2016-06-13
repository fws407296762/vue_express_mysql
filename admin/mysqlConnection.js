const mysql = require("mysql");
const config = require("./config");
let mysqlOptions = config.Mysql;
let connection = mysql.createConnection(mysqlOptions);
connection.connect();
mysqlOptions.database = "vue";
connection.on("error",function(err){
    console.log(err);
});

module.exports = {
    connection:connection,
    mysqlOptions:mysqlOptions
};