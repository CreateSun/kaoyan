const mongoose = require('mongoose')

module.exports = mongoose.model('Word', new mongoose.Schema({
	mp3_link: String,
	current_page: Number,
	word: String,
	pronunciation: String,
	translate: String
}))