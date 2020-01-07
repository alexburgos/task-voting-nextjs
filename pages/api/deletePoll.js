import connectDb from '../../middleware/dbMiddleware.js'
import Poll from '../../models/Poll'
import mongoose from 'mongoose'

const handler = async (req, res) => {
  let { id } = req.body

  let isValidId = mongoose.Types.ObjectId.isValid(id)

  try {
    if (isValidId) await Poll.findByIdAndRemove(id)
    res.send({ message: 'Task deleted!' })
  } catch (error) {
    console.error(error)
  }
}
export default connectDb(handler)
