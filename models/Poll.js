const mongoose = require('mongoose');
const { Schema } = mongoose;

const pollSchema = new Schema({
	taskName: { type: String, required: true },
	taskDescription: { type: String, required: false },
	choices: [
		{
			index: { type: Number, required: true},
			points: { type: String, required: true },
			votes: { type: Number, required: true }
		}
	]
});

module.exports = mongoose.models.Poll || mongoose.model('Poll', pollSchema);
