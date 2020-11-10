const mongoose = require('mongoose')

module.exports = mongoose.model('Note', new mongoose.Schema({
    url: {type: String},
    notesName: {type: String},
    timeStamp: {type: Date}
}))