const mongoose = require('mongoose');
const { Schema } = mongoose;

const pollSchema = new Schema({
	task: String,
	choices: [
		{
			value: Number,
			votes: Number
		}
	]
});

mongoose.model('polls', pollSchema);
