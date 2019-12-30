
import connectDb from '../../../middleware/dbMiddleware.js';
import Poll from '../models/Poll';

const handler = async (req, res) => { 
  let {
		pollId
  } = req.query;
  
	try {
    let poll = await Poll.findById(pollId);
    if (poll) {
      res.statusCode = 200;
      return res.send(poll);
    }
	} catch (error) {
    res.statusCode = 404;
		console.error(error);
	}
};
export default connectDb(handler);
