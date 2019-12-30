import connectDb from '../../middleware/dbMiddleware.js';
import Poll from './models/Poll';


const handler = async (req, res) => {
  let {
    id
  } = req.body

  console.log(id);

  try {
    await Poll.findByIdAndRemove({id})
    res.send({ message: "Task deleted!" });
  } catch (error) {
    console.error(error);
  }
};
export default connectDb(handler);