const http = require("http");

let request = http.get("http://wting.info:81/asdb/fiction/chuanyue/zs/qpmeu3ky.mp3");

request.on("response", function (res) {
    let contentLength = res.headers["content-length"];
    let c = new Buffer(0);
    res.on("data", function (chunk) {
        c = Buffer.concat([c, chunk]);
        progress(c,contentLength)
    });
    res.on("end", function () {
        console.log("\n已经下载完成");
    })
});

request.on("error", function (err) {
    console.log(err);
})

function progress(c,total) {
    let width = 20;
    let complete = "\033[42m \033[0m";
    let incomplete = "\033[41m \033[0m";
    let clen = c.length;
    let ratio = clen / total;
    let percen = ratio * 100;
    let completeLen = Math.round(width * ratio);
    let completes = Array(completeLen + 1).join(complete);
    let incompletes = Array(width - completeLen + 1).join(incomplete);
    let str = completes + incompletes;
    process.stderr.cursorTo(0);
    process.stderr.write(str + " 已经下载：" + percen.toFixed(1) + "%；已经下载文件大小：" + (clen / 1024 / 1024).toFixed(2) + "MB");
    process.stderr.clearLine(1);
}
