const log4js = require("log4js");
log4js.configure({
  appenders: { normal: { type: "file", filename: "normal.log" } },
  categories: { 
    default: { 
        appenders: ["normal"], 
        level: "error" 
    },
    save: {
        appenders: ["normal"],
        level: "info"
    }    
}
});
 
const logger = log4js.getLogger("normal");

module.exports = {
    log4js,
    logger
}