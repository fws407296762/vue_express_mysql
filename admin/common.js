
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
    "ENOTFOUND":"未找到请求地址",
    "ETIMEDOUT":"请求超时"
};

common.getErrormsg = function(err){
    let errno = err.errno;
    return this.errormsg[errno];
};

common.download = function (src) {
    let self = this;
    let patt = /[\?\!]\S*$/;
    src = src.replace(patt, "");
    let colonIndex = src.indexOf(":");
    let agreement = src.substring(0,colonIndex);
    let agreementObj = {
        "http":http,
        "https":https
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
        let lastFileDir = src.substring(src.lastIndexOf("/"));
        let extIndex = lastFileDir.lastIndexOf(".");
        let ext = extIndex > -1 ? lastFileDir.substring(extIndex) : ".jpg";
        self.mkdirsSync(dir);
        let filePath = '/' + dir + '/' + filename + ext;
        let writestream = fs.createWriteStream("." + filePath);
        console.log("正在下载：" + src);
        let getRequest = agreementObj[agreement].get(src, function (res) {
            res.pipe(writestream);
        });
        getRequest.on("error",function(err){
            let msg = self.getErrormsg(err);
            try{
                fs.unlinkSync("." + filePath)
            }catch(e){
                console.log(e);
            }
            reject(msg);
        });
        writestream.on('finish', function () {
            console.log(src + "  下载完成");
            resolve(filePath);
        });
        writestream.on("error", function (err) {
            console.log(err);
            reject(err);
        })
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

module.exports = common;

