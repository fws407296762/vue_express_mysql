const express = require("express");
const http = require("http");
const querystring = require("querystring");
const schedule = require("node-schedule");
const common = require("./common");
const mysqlConnection = require("./mysqlConnection");
const connection = mysqlConnection.connection;
const mysqlOptions = mysqlConnection.mysqlOptions;
connection.query("USE " + mysqlOptions.database);

let showapi_timestamp = common.getTimesTamp();

let apiConfig = {
    request: {
        host: "route.showapi.com",
        method: "GET"
    },
    params: {
        showapi_appid: 19547,
        showapi_sign: "8e9d0070ab994b17b8536f94435aa31f",
        showapi_timestamp: showapi_timestamp
    }
};

let dbSchedule = {
    requestAsync: (options) => {
        return new Promise((resolve, reject) => {
            let request = http.request(options, (res) => {
                let c = "";
                res.setEncoding("utf8");
                res.on("data", (chunk) => {
                    c += chunk;
                });
                res.on("end", () => {
                    resolve(c);
                })
            });
            request.on("error", (err) => {
                reject(err);
            });
            request.end();
        })
    },
    factory: function (path, options) {
        options = common.isObject(options) && options || {};
        let params = options.params, request = options.request;
        let dest = Object.assign(apiConfig.params, common.isObject(params) && params || {});
        let paramsStr = querystring.stringify(dest);
        let requestDest = Object.assign(common.isObject(request) && request || {}, {
            path: "/" + path + "?" + paramsStr
        });
        let requestOptions = Object.assign(apiConfig.request, requestDest);

        return this.requestAsync(requestOptions)
    },
    setScheduleCron: function (callback) {
        let rule = new schedule.RecurrenceRule();
        var times = [];
        for (var i = 0; i < 60; i += 10) {
            times.push(i);
        }
        rule.second = times;
        let j = schedule.scheduleJob(rule, callback);
    },
    queryAsync: function (query) {
        return new Promise(function (resolve, reject) {
            connection.query(query, function (err, result) {
                if (err) {
                    reject(err);
                    return false;
                }
                resolve(result);
            })
        });
    },
    getNews: function (options) {
        options["params"]["needContent"] = 1;
        options["params"]["needHtml"] = 1;
        options["params"]["showapi_timestamp"] = common.getTimesTamp();
        return this.factory('109-35', options);
    },
    getChannel: function (options) {
        return this.factory('109-34', options);
    }
}

let o = {
    allPages: 1
};

dbSchedule.setScheduleCron(function () {
    let date = new Date();
    console.log(date.toString());
    dbSchedule.getNews({
        params: {
            page: 1
        }
    }).then(function (result) {
        return insertNews(result);
    }).catch(function (err) {
        console.log(err);
    });
});

function insertNews(result) {
    let date = new Date();
    result = JSON.parse(result);
    let code = parseInt(result.showapi_res_code);  //返回状态 0：成功
    let error = result.showapi_res_error;  //如果返回错误，这个不为空
    if (code < 0) {
        return Promise.reject(error);
    }
    let body = result.showapi_res_body,    //返回主体
        ret_code = parseInt(body.ret_code),
        pagebean = body.pagebean,
        allPages = parseInt(pagebean.allPages),  //总页数
        currentPage = pagebean.currentPage,  //当前页数
        allNum = pagebean.allNum,   //总条数
        maxResult = pagebean.maxResult //每页最大的条数
    contentlist = pagebean.contentlist;  //所有的数据    
    contentlist.forEach(function (item, index) {
        let title = item.title,
            description = item.desc || "",
            imgurls = item.imageurls[0] && item.imageurls[0].url || "",
            channelId = item.channelId,
            channelName = item.channelName,
            content = item.content || "",
            html = item.html || "",
            sourceurl = item.link || "",
            source = item.source || "",
            datetime = item.pubDate;
        dbSchedule.queryAsync("INSERT INTO news (title,description,imgurls,channelId,channelName,content,html,sourceurl,source,datetime) VALUES ('" + title + "','" + description + "','" + imgurls + "','" + channelId + "','" + channelName + "','" + content + "','" + html + "','" + sourceurl + "','" + source + "','" + datetime + "');").then(function (result) {
            console.log(title + ":插入数据成功");
        }).catch(function (err) {
            console.log(title + ":插入数据失败");
        });
    });
}

module.exports = dbSchedule;