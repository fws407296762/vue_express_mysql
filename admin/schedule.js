const schedule = require("node-schedule");

function scheduleCronstyle(){
    let rule = new schedule.RecurrenceRule();
    var times = [];
　　for(var i=0; i<60; i+=10){
　　　　times.push(i);
　　}
    rule.second = times;
    let j = schedule.scheduleJob(rule,function(){
        console.log('scheduleCronstyle:' + new Date());
    });
}

scheduleCronstyle();