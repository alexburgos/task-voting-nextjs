import connectDb from '../../middleware/dbMiddleware.js';
import Poll from './models/Poll';

const votingChoices = [{
    value: 1,
    votes: 0
  },
  {
    value: 2,
    votes: 0
  },
  {
    value: 3,
    votes: 0
  },
  {
    value: 4,
    votes: 0
  },
  {
    value: 5,
    votes: 0
  },
]

const handler = async (req, res) => {
  let {
    taskName
  } = req.body

  console.log(taskName);

  try {
    let poll = new Poll({ taskName: taskName, choices: votingChoices});
    console.log(poll);
    await poll.save();
    res.send({ message: "New Task created!", data: poll });
  } catch (error) {
    console.error(error);
  }
};
export default connectDb(handler);