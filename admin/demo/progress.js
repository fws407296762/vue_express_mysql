let ProgressBar = require("progress");
let http = require("http");
const fs = require("fs");
let stream = process.stderr;
let src = "http://image.sinajs.cn/newchart/v5/forex/k/day/DINIW.gif";
let request = http.get(src);
let dest = "./20160625140325654.gif";
let writeStream = fs.createWriteStream(dest);
request.on("response",function(res){
    var len = parseInt(res.headers['content-length'], 10);
    console.log();
    var bar = new ProgressBar('  downloading [:bar] :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: len
    });
    res.on('data', function (chunk) {
        bar.tick(chunk.length);
    });
    res.on("end",function(){
        // writeStream.write(c)
        console.log("\n下载完成\n");
    })
});
request.end();