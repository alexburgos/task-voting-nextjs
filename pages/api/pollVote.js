import connectDb from '../../middleware/dbMiddleware.js';
import Poll from './models/Poll';

const handler = async (req, res) => {
  let {
    pollId,
    voteValue
  } = req.body

  const identifier = `choices.${voteValue-1}.votes`;

  console.log(pollId, voteValue, identifier);


  try {
    await Poll.findOneAndUpdate({ _id: pollId }, {$inc: {[identifier]: 1}});
    res.send({ message: "Vote registered!" });
  } catch (error) {
    console.error(error);
  }
};
export default connectDb(handler);