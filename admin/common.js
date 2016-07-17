
const fs = require("fs");
const http = require("http");
const https = require("https");
const process = require('process');
const path = require("path");
const DATATYPES = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Object'];

let common = {};

common.isType = function (type) {
    return function (obj) {
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    }
}

DATATYPES.forEach(function (item) {
    common['is' + item] = common.isType(item);
});

common.getTimesTamp = function () {
    let date = new Date();
    let year = date.getFullYear(),
        month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
        day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
        hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
        seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return '' + year + month + day + hours + minutes + seconds;
};
common.errormsg = {
    "ENOTFOUND": "未找到请求地址",
    "ETIMEDOUT": "请求超时"
};

common.getErrormsg = function (err) {
    let errno = err.errno;
    return this.errormsg[errno];
};

common.download = function (src) {
    let self = this;
    let patt = /[\?\!]\S*$/;
    src = src.replace(patt, "");
    let colonIndex = src.indexOf(":");
    let agreement = src.substring(0, colonIndex);
    let agreementObj = {
        "http": http,
        "https": https
    };
    return new Promise(function (resolve, reject) {
        let dir = 'upload';
        let date = new Date();
        let year = date.getFullYear(),
            month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
            day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            getTime = date.getTime();
        dir = dir + "/" + year + "/" + month + "/" + day;
        let filename = '' + year + month + day + getTime;
        let lastFileDir = path.basename(src);
        let ext = path.extname(lastFileDir) || ".jpg";
        self.mkdirsSync(dir);
        let filePath = '/' + dir + '/' + filename + ext;
        let writestream = fs.createWriteStream("." + filePath);
        console.log("\n" + src);
        let getRequest = agreementObj[agreement].get(src, function (res) {
            let contentLength = res.headers["content-length"];
            let c = new Buffer(0);
            res.on("data", function (chunk) {
                c = Buffer.concat([c, chunk]);
                if (contentLength) {
                    self.progress(c, contentLength);
                }
            });
            res.on("end", function () {
                writestream.write(c);
                writestream.end();
                resolve(filePath);
            });
        });
        getRequest.on("error", function (err) {
            let msg = self.getErrormsg(err);
            try {
                fs.unlinkSync("." + filePath)
            } catch (e) {
                console.log(e);
            }
            reject(msg);
        });
    });
};

common.mkdirsSync = function (dir, mode) {
    try {
        fs.statSync(dir);
    } catch (e) {
        let pathtmp;
        dir.split("/").forEach(function (item) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, item);
            } else {
                pathtmp = item;
            }
            try {
                fs.statSync(pathtmp);
            } catch (e) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false;
                }
            }

        })
    }
    return true;
}
common.progress = function (c, total) {
    // console.log(c,total)
    let width = 20;
    let complete = "\033[42m \033[0m";
    let incomplete = "\033[41m \033[0m";
    let clen = c.length;
    let ratio = clen / total
    let percen = ratio * 100;
    let completeLen = Math.round(width * ratio);
    let completes = Array(completeLen + 1).join(complete);
    let incompletes = Array(width - completeLen + 1).join(incomplete);
    let str = completes + incompletes;
    process.stderr.cursorTo(0);
    process.stderr.write(str + " 已经下载：" + percen.toFixed(1) + "%；已经下载文件大小：" + (clen / 1024 / 1024).toFixed(2) + "MB");
    process.stderr.clearLine(1);
}

common.sizeConversion = function (size,level) {
    size = parseFloat(size, 10);
    if (!size) return false;
    var unit = ['字节','KB','MB','GB','TB','PB','EB','ZB','YB'];
    let unitlen = unit.length - 1;
    if(level > unitlen){
        return size.toFixed(2) + unit[unitlen];
    }
    if(size < 1000){
        return size.toFixed(2) + unit[level];
    }
    return arguments.callee(size / 1024,++level);
}

module.exports = common;

