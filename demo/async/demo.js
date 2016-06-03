const http = require("http");
const Promise = require("bluebird");

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
    
    
function requestAsync(options){
    return new Promise(function(resolve,reject){
        let request = http.request(options,(res)=>{
            let c = "";
            res.on("data",(chunk)=>{
                c += chunk;
            });
            res.on("end",()=>{
                resolve(c);
            })
        });
        request.on("error",function(err){
            reject(err);
        });
        request.end();
    });
}

function anyway() {
    console.log("执行完成")
}

function ajaxGetAsync(url) {
    return requestAsync(options).finally(anyway);
}

console.log(ajaxGetAsync("http://route.showapi.com/109-34?showapi_appid=19547&showapi_sign=8e9d0070ab994b17b8536f94435aa31f"));