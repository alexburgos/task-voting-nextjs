import connectDb from '../../middleware/dbMiddleware';
import Poll from '../../models/Poll';
import User from '../../models/User';
import connectPusher from '../../middleware/pusherMiddleware';

const handler = async (req, res) => {
	const {
		pollId,
		editingPollVote,
		oldIndex,
		newIndex,
		userToken
	} = req.body;

	try {
		const user = await User.findOne({ token: userToken });
		const currentVote = `choices.${newIndex}.votes`;

		if (editingPollVote && oldIndex !== null) {
			if (oldIndex === newIndex) return;
			const previousVote = `choices.${oldIndex}.votes`;

			await Poll.findByIdAndUpdate(pollId, {
				$inc: { [previousVote]: -1 }
			});
			await Poll.findByIdAndUpdate(pollId, { $inc: { [currentVote]: 1 } });
		} else {
			await Poll.findByIdAndUpdate(pollId, { $inc: { [currentVote]: 1 } });
		}

		const existingPollVote = user.votes.find(vote => vote.pollId === pollId);

		if (existingPollVote) {
			existingPollVote.pointValueIndex = newIndex;
		} else {
			user.votes.push({
				pollId,
				pointValueIndex: newIndex
			});
		}


		await user.save();
		return res.send({ message: 'Vote registered!', user });
	} catch (error) {
		console.error(error);
	}
};

export default connectPusher(connectDb(handler));
