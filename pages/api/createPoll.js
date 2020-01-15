import connectDb from '../../middleware/dbMiddleware';
import Poll from '../../models/Poll';

// api call to handle creation of a new poll
// voting choices are constants
const votingChoices = [
	{
		index: 0,
		points: '0',
		votes: 0
	},
	{
		index: 1,
		points: '0.5',
		votes: 0
	},
	{
		index: 2,
		points: '1',
		votes: 0
	},
	{
		index: 3,
		points: '3',
		votes: 0
	},
	{
		index: 4,
		points: '5',
		votes: 0
	},
	{
		index: 5,
		points: '8',
		votes: 0
	},
	{
		index: 6,
		points: '13',
		votes: 0
	}
];

const handler = async (req, res) => {
	let { taskName, taskDescription } = req.body;

	try {
		let poll = new Poll({
			taskName: taskName,
			taskDescription: taskDescription,
			choices: votingChoices
		});
		await poll.save();
		res.send({ message: 'New Task created!', data: poll });
	} catch (error) {
		console.error(error);
	}
};
export default connectDb(handler);
