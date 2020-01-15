
import connectDb from '../../middleware/dbMiddleware';
import Poll from '../../models/Poll';

// api call to handle data fetch of all polls
const handler = async (req, res) => { 
  try {
    let polls = await Poll.find();
		if (polls) {
      res.statusCode = 200;
      return res.send(polls);
    }
	} catch (error) {
		console.error(error);
	}
};
export default connectDb(handler);
