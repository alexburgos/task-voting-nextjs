import mongoose from 'mongoose';
const { Schema } = mongoose;

const pollSchema = new Schema({
	taskName: { type: String, required: true },
	taskDescription: { type: String, required: false },
	choices: [
		{
			value: { type: Number, required: true },
			votes: { type: Number, required: true }
		}
	]
});

export default mongoose.models.Poll || mongoose.model('Poll', pollSchema);
