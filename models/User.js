const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	token: { type: String, required: true },
	userName: { type: String, required: true },
	votes: [
		{
			pollId: { type: String },
			pointValueIndex: { type: Number }
		}
	]
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
