let ProgressBar = require("progress");
let http = require("http");
const fs = require("fs");
let stream = process.stderr;
let src = "http://wting.info:81/asdb/fiction/chuanyue/zs/qpmeu3ky.mp3";
let request = http.get(src);
let dest = "./20160625140325654.mp3";
let writeStream = fs.createWriteStream(dest);
request.on("response",function(res){
    let len = parseInt(res.headers["content-length"],10);
    console.log("开始下载...");
    let clen = 0;
    let c = new Buffer(0);
    res.on("data",function(chunk){
        c = Buffer.concat([c,chunk]);
        clen += chunk.length;
        stream.cursorTo(0);
        stream.write(src+"已经下载："+((clen/len)*100).toFixed(1)+"%");
        stream.clearLine(1);
    });
    res.on("end",function(){
        writeStream.write(c)
        console.log("\n下载完成\n");
    })
});
request.end();

