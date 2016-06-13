const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let url = "mongodb://localhost:27017/vue";

MongoClient.connect(url, function (err, db) {
    db.createCollection("news").then(function (collection) {
        return collection.createIndex({ a: 1 }, { unique: true }).then(function (result) {  //建立唯一索引
            return collection;
        }).catch(function (err) {
            return err;
        })
    }).then(function(collection){
        let data = [{a:3},{a:4},{ a: 1 }, { a: 2 }, { a: 25 },{a:40},{a:48}];
        data.forEach(function(item,index){   //遍历插入数据
            collection.insertOne(item).then(function(){
                console.log(index + "=====>数据插入成功");
            }).catch(function(){
                console.log(index + "=====>数据插入失败");
            })
        });
        db.close();
    });
});
