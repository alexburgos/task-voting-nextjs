import connectDb from '../../middleware/dbMiddleware';
import Poll from '../../models/Poll';
import User from '../../models/User';
import connectPusher from '../../middleware/pusherMiddleware';

const handler = async (req, res) => {
	let { pollId, voteValue, userToken } = req.body;

	let voteIdentifier = `choices.${voteValue-1}.votes`;
	let userVote = {
		pollId,
		vote: voteValue
	}

	console.log(voteIdentifier);

	try {
		await Poll.findOneAndUpdate({ _id: pollId }, { $inc: { [voteIdentifier]: 1 } });
		// let user = await User.findOneAndUpdate(
		// 	{ token: userToken },
		// 	{
		// 		$push: { votes: userVote },
		// 		function(results) {
		// 			console.log(results)
		// 		}
		// 	}
		// );
		// await user.save();

		// res.send({ message: 'Vote registered!', poll, user, userVote });
	} catch (error) {
		console.error(error);
	}
};


export default connectPusher(connectDb(handler));
