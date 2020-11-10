const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/signWeb')

const Word = mongoose.model('Word', new mongoose.Schema({
	mp3_link: String,
	current_page: Number,
	word: String,
	pronunciation: String,
	translate: String
}))

//console.log(arr.length);
//console.log(arr[arr.length-1]);

const data = Word.find().limit(2)

console.log(data)