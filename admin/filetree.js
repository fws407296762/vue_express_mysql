let PATH = require("path"),
    FS = require("fs"),
    vm = require("vm");

let COMMON = require("./common");

module.exports = function (root) {
    let sep = "\\"+PATH.sep;
    root = root || "upload";
    let path = PATH.join(__dirname, root);
    return (function (uri) {
        let node = {
            dir: root,
            childdir: [],
            completedir:"/"+root
        };
        let stat = FS.statSync(uri);
        let isDirectory = stat.isDirectory();
        if (!isDirectory) {
            return {
                file:"",
                size:COMMON.sizeConversion(stat.size,0),
                mtime:stat.mtime
            };
        }
        let children = FS.readdirSync(uri);
        let _callee = arguments.callee;
        let sepreg = vm.runInThisContext("var _sepreg = /"+sep+"/g;"); //强制将字符串转变为正则对象
        children.forEach(function (part) {
            let n = _callee(PATH.join(uri, part));
            n[("file" in n) ? "file" : "dir"] = part;
            n.completedir = "/"+PATH.relative(PATH.dirname(path),PATH.join(uri, part)).replace(_sepreg,"/");
            node.childdir.push(n);
        })
        return node;
    })(path);
}