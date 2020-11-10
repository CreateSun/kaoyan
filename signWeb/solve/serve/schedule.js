const schedule = require("node-schedule");
let {log4js, logger} = require('../log/log');
const saveLogger = log4js.getLogger("save");

let scheduleCronstyle = function(){
    // schedule.scheduleJob({second: 20}, function(){
    //     saveLogger.info("Success to save sign info!")
    // }); 
}

module.exports = {
    schedule: scheduleCronstyle
}
