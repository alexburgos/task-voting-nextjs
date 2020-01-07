const cors = require('cors')
const next = require('next')
const Pusher = require('pusher')
const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

const app = next({ dev })
const handler = app.getRequestHandler()

const Poll = require('./models/Poll')

const pusher = Pusher || new Pusher({
  appId: '922127',
  key: 'e2940972e6de5b249d99',
  secret: '61716bcf135bbd78f37c',
  cluster: 'eu',
  encrypted: true
})

const votingChoices = [
  {
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
  }
]

app
  .prepare()
  .then(() => {
    const server = express()

    server.use(cors())
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))

    server.get('*', (req, res) => {
      return handler(req, res)
    })

    server.post('/api/pollVote', async (req, res, next) => {
      console.log('this server endpoint was called', req.body)

      let { pollId, voteValue } = req.body
      let identifier = `choices.${voteValue - 1}.votes`

      try {
        await Poll.findOneAndUpdate(
          { _id: pollId },
          { $inc: { [identifier]: 1 } }
        )

        res.send({ message: 'Vote registered!' })
      } catch (error) {
        console.error(error)
      }
      pusher.trigger('poll-vote', 'new-vote', { voted: true })
    })

    server.post('/api/createPolll', async (req, res, next) => {
      let { taskName } = req.body

      try {
        let poll = new Poll({ taskName: taskName, choices: votingChoices })
        console.log(poll)
        await poll.save()
        res.send({ message: 'New Task created!', data: poll })
      } catch (error) {
        console.error(error)
      }
    })

    server.post('/api/deletePoll', async (req, res, next) => {
      let { id } = req.body

      let isValidId = mongoose.Types.ObjectId.isValid(id)

      try {
        if (isValidId) await Poll.findByIdAndRemove(id)
        res.send({ message: 'Task deleted!' })
      } catch (error) {
        console.error(error)
      }
    })

    server.listen(port, err => {
      if (err) throw err
      console.log(`> up and running on http://localhost:${port}`)
    })
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
