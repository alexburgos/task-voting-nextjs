import connectDb from '../../middleware/dbMiddleware';
import Poll from '../../models/Poll';
import User from '../../models/User';
import connectPusher from '../../middleware/pusherMiddleware';

const handler = async (req, res) => {
	let { pollId, index, points, userToken } = req.body;
	let userVote = {
		pollId,
		points
	}


	try {
		let voteIdentifier = `choices.${index}.votes`;

		await Poll.findByIdAndUpdate(pollId, { $set: { [voteIdentifier]: 1 } });

		let user = await User.findOne( { token: userToken } );
		user.votes.push(userVote);

		console.log(userVote, user.votes);

		await user.save();
		return res.send({ message: 'Vote registered!' });
	} catch (error) {
		console.error(error);
	}
};


export default connectPusher(connectDb(handler));
