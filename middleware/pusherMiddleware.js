import Pusher from 'pusher'

const connectPusher = handler => async (req, res) => {
  const pusher = new Pusher({
    appId: '922127',
    key: 'e2940972e6de5b249d99',
    secret: '61716bcf135bbd78f37c',
    cluster: 'eu',
    encrypted: true
  })

  return handler(req, res, pusher)
}

export default connectPusher