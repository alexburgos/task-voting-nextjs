import mongoose from 'mongoose';
const { Schema } = mongoose;

const pollSchema = new Schema({
	taskName: String,
	choices: [
		{
			value: Number,
			votes: Number
		}
	]
});

export default mongoose.models.Poll || mongoose.model('Poll', pollSchema);
