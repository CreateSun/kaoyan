const mongoose = require('mongoose')

const Signin = new mongoose.Schema({
    comment: {type: String, default: '无'},
    lists: {type: Array, default: []},
    timeStamp: {type: Date, default: Date.parse(new Date())}
})

module.exports =  mongoose.model('Signin', Signin);