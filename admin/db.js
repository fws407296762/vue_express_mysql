const mysql = require("mysql");

let connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"vue"
});

connection.on("error",function(err){
    console.log(err);
})

connection.connect();

module.exports = connection;

