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

module.exports = mongoose.model('Poll', pollSchema);
