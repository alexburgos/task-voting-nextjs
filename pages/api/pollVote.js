import connectDb from '../../middleware/dbMiddleware'
import connectPusher from '../../middleware/pusherMiddleware'
import Poll from './models/Poll'

const handler = async (req, res) => {
  let { pollId, voteValue } = req.body

  if (pusher) console.log(pusher)

  let identifier = `choices.${voteValue - 1}.votes`
  try {
    await Poll.findOneAndUpdate({ _id: pollId }, { $inc: { [identifier]: 1 } })

    res.send({ message: 'Vote registered!' })
  } catch (error) {
    console.error(error)
  }
}
export default connectPusher(connectDb(handler))
