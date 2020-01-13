import connectDb from '../../../middleware/dbMiddleware.js';
import Poll from '../../../models/Poll';

const handler = async (req, res) => {
	let { pollId } = req.query;

	try {
		let poll = await Poll.findById(pollId);
		if (poll) {
			res.statusCode = 200;
			return res.send(poll);
		} else {
			// https://github.com/developit/unfetch#caveats
			const error = new Error();
			error.response = 'Poll Not Found';
			throw error;
		}
	} catch (error) {
		console.error(error);
		return (res.statusCode = 404);
	}
};
export default connectDb(handler);
