
const DATATYPES = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error','Object'];

let common = {};

common.isType = function(type){
    return function(obj){
        return Object.prototype.toString.call(obj) === '[object '+type+']';
    }
}

DATATYPES.forEach(function(item){
    common['is'+item] = common.isType(item);
});

common.getTimesTamp = function(){
    let date = new Date();
    let year = date.getFullYear(),
        month = date.getMonth() + 1 < 10 ? '0'+(date.getMonth() + 1) : date.getMonth() + 1,
        day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate(),
        hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        minutes = date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes(),
        seconds = date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds();
    return ''+year+month+day+hours+minutes+seconds;
}

module.exports = common;

