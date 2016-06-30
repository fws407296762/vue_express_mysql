const fs = require("fs");
let root = "./upload";
let path;

path = fs.readdirSync(root);
let dirAry = path.map(function(item){
    let isDirectory = fs.statSync(root+"/"+item);
    return isDirectory && root+"/"+item;
});

let dirObj = dirAry.map(function(item){
    let temp = {};
    temp[item] = fs.readdirSync(item);
    return temp;
})

console.log(dirObj);


var data = {
    "dir":"./upload",
    "childdir":[
        {
            "dir":"06",
            "childdir":[
                {
                    "dir":"25",
                    "childdir":[
                        {file:"1212.png"},
                        {file:"1212.png"},
                        {file:"1212.png"},
                        {file:"1212.png"}
                    ]
                },
                {"childdir":"26"},
                {"childdir":"27"},
                {"childdir":"28"},
            ]
        }
    ]
}