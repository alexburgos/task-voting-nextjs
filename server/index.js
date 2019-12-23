const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Pusher = require('pusher');

require('../models/Poll');
const Poll = mongoose.model('polls');

mongoose.Promise = global.Promise;
mongoose.connect(
	process.env.MONGODB_URI || `mongodb://localhost:27017/planning-poker`,
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

const pusher = new Pusher({
	appId: '922127',
	key: 'e2940972e6de5b249d99',
	secret: '61716bcf135bbd78f37c',
	cluster: 'eu',
	encrypted: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get(`/`, async (req, res) => {
	pusher.trigger('planning-poker', 'poker-vote', {
		task: req.body.taskName,
		value: req.body.voteValue
	});

	return res.status(200).send('Hello World');
});

app.get(`/polls`, async (req, res) => {
	console.log('request all polls');
	let polls = await Poll.find();

	console.log(polls);
	return res.status(200).send(polls);
});

app.post(`/poll`, async (req, res) => {
	let poll = await Poll.create(req.body);
	return res.status(201).send({
		error: false,
		poll
	});
});

app.put(`/poll/:id`, async (req, res) => {
	const { id } = req.params;
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`app running on port: ${PORT}`);
});
