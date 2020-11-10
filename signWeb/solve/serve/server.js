const express = require('express');
const schedule = require('./schedule').schedule;
const app = express();

/**
 * 定时任务，每天的凌晨2点提交当天打打卡数据
 */

// schedule();

app.use(require('cors')());
app.use(express.json());

require('../plugin/db')(app)
require('../routes')(app)

app.listen(8080, () => {
    console.log("http://localhost:8080"+new Date())
})

// mongoose.connect('mongodb://localhost:27017/')