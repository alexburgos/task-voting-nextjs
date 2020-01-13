import connectDb from '../../middleware/dbMiddleware';
import Poll from '../../models/Poll';
import mongoose from 'mongoose';

const handler = async (req, res) => {
	let { id } = req.body;

	let isValidId = mongoose.Types.ObjectId.isValid(id);

	try {
		if (isValidId) { 
			await Poll.findByIdAndRemove(id);
			res.statusCode = 200;
			res.send({ message: 'Task deleted!' });
		} else {
			// https://github.com/developit/unfetch#caveats
			const error = new Error();
			error.response = 'Poll Not Found';
			throw error;
		}
	} catch (error) {
		console.error(error);
	}
};
export default connectDb(handler);
