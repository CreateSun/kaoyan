const mongoose = require('mongoose')

const Sign = new mongoose.Schema({
    title: {type: String},
    status: {type: Boolean}
})

module.exports =  mongoose.model('Sign', Sign);