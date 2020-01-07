import connectDb from '../../middleware/dbMiddleware';
import Poll from '../../models/Poll';
import connectPusher from '../../middleware/pusherMiddleware';

const handler = async (req, res) => {
	let { pollId, voteValue } = req.body;

	let identifier = `choices.${voteValue - 1}.votes`;
	try {
		await Poll.findOneAndUpdate({ _id: pollId }, { $inc: { [identifier]: 1 } });

		res.send({ message: 'Vote registered!' });
	} catch (error) {
		console.error(error);
	}
};


export default connectPusher(connectDb(handler));
