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
    jobs: null,
    rule: function () {
        var times = [];
        for (var i = 1; i < 60; i += 10) {
            times.push(i);
        }
        return times;
    },
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
        var rule = new schedule.RecurrenceRule();
        rule.second = this.rule;
        this.jobs = schedule.scheduleJob({ second: this.times }, callback);
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
    let contentlistLen = contentlist.length;
    let i = 0;
    contentlist.forEach(function (item, index) {
        let imgurls = item.imageurls;
        console.log(i++);
        // if(imgurls.length){
        //     promiseConsole(imgurls[0].url).then(function (data) {
        //         console.log(data);
        //     }).catch(function (err) {
        //         console.log(err);
        //     })
        // }
        
        // promiseConsole(!!contentlist[i].imageurls[0] && contentlist[i].imageurls[0].url).then(function (data) {
        //     console.log(data);
        // }).catch(function (err) {
        //     console.log(err);
        // })
    })

    // contentlist.forEach(function (item, index) {
    //     let title = item.title,
    //         description = item.desc || "",
    //         channelId = item.channelId,
    //         channelName = item.channelName,
    //         html = item.html || "",
    //         sourceurl = item.link || "",
    //         source = item.source || "",
    //         datetime = item.pubDate,
    //         allList = item.allList;
    //     let imgurls = item.imageurls;
    //     hasRecord("news", "title", title).then(function () {
    //         dbSchedule.jobs.cancel();
    //         downImgs(imgurls).then(function () {
    //             dbSchedule.jobs.reschedule(dbSchedule.rule);
    //         });
    //         // downImgs(imgurls).then(function (imgurls) {
    //         //     console.log(imgurls)
    //         //     let content = "";
    //         //     if (allList) {
    //         //         allList.forEach(function (item) {
    //         //             let isObject = common.isObject(item);
    //         //             if (isObject) {
    //         //                 content += '<p class="image"><img style="width:' + item.width + 'px;height:' + item.height + 'px" src="' + imgurls[item.url] + '"></p>'
    //         //                 return;
    //         //             }
    //         //             content += '<p>' + item + '</p>';
    //         //         });
    //         //         let _imgurls = [];
    //         //         if (imgurls) {
    //         //             for (let i in imgurls) {
    //         //                 _imgurls.push(imgurls[i]);
    //         //             }
    //         //         }
    //         //         _imgurls = _imgurls.join(",");
    //         //         dbSchedule.queryAsync("INSERT INTO news (title,description,imageurls,channelId,channelName,content,sourceurl,source,datetime) VALUES ('" + title + "','" + description + "','" + _imgurls + "','" + channelId + "','" + channelName + "','" + content + "','" + sourceurl + "','" + source + "','" + datetime + "');").then(function (result) {
    //         //             // console.log(date.toString() + "=====" + title + ":插入数据成功");
    //         //         }).catch(function (err) {
    //         //             // console.log(date.toString() + "=====" + title + ":插入数据失败");
    //         //         }).then(function () {
    //         //             dbSchedule.jobs.reschedule(dbSchedule.rule);
    //         //         });
    //         //     }
    //         // });
    //     }).catch(function (err) {
    //         // console.log(date.toString() + "=====" + "错误消息：" + err)
    //     });

    // });
}

function downImgs(imgurls) {
    return new Promise(function (resolve, reject) {
        if (imgurls.length) {
            let imgurlsObj = {};
            let maxDownSize = imgurls.length, downSize = 1;
            let _imgurls = imgurls.map(function (item) {
                return item.url;
            });
            common.download(_imgurls).then(function (data) {
                imgurlsObj[url] = data;
                if (downSize === maxDownSize) {
                    resolve(imgurlsObj);
                    return false;
                }
                downSize++;
            }).catch(function (err) {
                console.log('下载失败')
                reject(err)
            })
        } else {
            resolve();
        }
    })
}

function hasRecord(table, record, data) {
    return new Promise(function (resovle, reject) {
        let query = "SELECT 1 FROM " + table + " WHERE " + record + "='" + data + "' LIMIT 1 ";
        dbSchedule.queryAsync(query).then(function (result) {
            let resultLen = result.length;
            if (!resultLen) {
                resovle("数据不存在");
                return false;
            }
            reject(data + "=====存在");
        }).catch(function (err) {
            reject(err);
        })
    })
}


function promiseConsole(data) {
    return new Promise(function (resolve, reject) {
        if (!data) {
            reject("数据不存在...");
            return false;
        }
        setTimeout(function () {
            resolve(data);
        }, 3000);
    });
}
module.exports = dbSchedule;