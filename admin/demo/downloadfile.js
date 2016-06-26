const http = require("http");

let stream = process.stderr;
let request = http.get("http://wting.info:81/asdb/fiction/chuanyue/zs/qpmeu3ky.mp3");

request.on("response",function(res){
    let contentLength = res.headers["content-length"];
    let c = new Buffer(0);
    let width = 20;
    let complete = "\033[42m \033[0m";
    let incomplete = "\033[41m \033[0m";
    res.on("data",function(chunk){
        c = Buffer.concat([c,chunk]);
        let clen = c.length;
        let ratio = clen / contentLength
        let percen = ratio * 100;
        let completeLen = Math.round(width*ratio);
        let completes = Array(completeLen+1).join(complete);
        let incompletes = Array(width-completeLen+1).join(incomplete);
        let str = completes+incompletes;
        stream.cursorTo(0);
        stream.write(str+" 已经下载："+percen.toFixed(1)+"%；已经下载文件大小："+(clen/1024/1024).toFixed(2)+"MB");
        stream.clearLine(1);
    });
    res.on("end",function(){
        console.log("\n已经下载完成");
    })
});

request.on("error",function(err){
    console.log(err);
})
