import connectDb from '../../middleware/dbMiddleware';
import Poll from '../../models/Poll';
import User from '../../models/User';
import connectPusher from '../../middleware/pusherMiddleware';

// api call to handle poll vote
const handler = async (req, res) => {
	const {
		pollId,
		editingPollVote,
		oldIndex, // this value is only passed if the user is changing their previous vote
		newIndex,
		userToken
	} = req.body;

	try {
		const user = await User.findOne({ token: userToken });
		const currentVote = `choices.${newIndex}.votes`;

		if (editingPollVote && oldIndex !== null) {
			if (oldIndex === newIndex) return; // return if voting for the same choice
			
			const previousVote = `choices.${oldIndex}.votes`;

			// remove previous vote by decreasing it
			await Poll.findByIdAndUpdate(pollId, {
				$inc: { [previousVote]: -1 }
			});
			await Poll.findByIdAndUpdate(pollId, { $inc: { [currentVote]: 1 } });
		} else {
			await Poll.findByIdAndUpdate(pollId, { $inc: { [currentVote]: 1 } });
		}

		const existingPollVote = user.votes.find(vote => vote.pollId === pollId);

		// keeps the user's voting choices in sync or stores them if it's their first vote
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
