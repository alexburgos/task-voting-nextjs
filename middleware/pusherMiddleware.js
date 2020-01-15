import Pusher from 'pusher';

// Next.js middleware to connect handlers to Pushers server side app
const connectPusher = handler => async (req, res) => {
	try {
		// these keys should be saved in an .env file or somewhere safer for production but this is ok for now :)
		const pusher = new Pusher({
			appId: '922127',
			key: 'e2940972e6de5b249d99',
			secret: '61716bcf135bbd78f37c',
			cluster: 'eu',
			useTLS: true
		});

		await pusher.trigger('poll-vote', 'new-vote', { voted: true });
	} catch (error) {
		console.error(error);
	}

	return handler(req, res);
};

export default connectPusher;
