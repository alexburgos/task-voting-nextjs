const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Pusher = require('pusher');

const app = express();

const secret = 'mysecretsshhh';

// Import our models
const User = require('../models/User');
const Poll = require('../models/Poll');

mongoose.Promise = global.Promise;
mongoose.connect(
	process.env.MONGODB_URI || `mongodb://localhost:27017/planning-poker`, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);

const pusher = new Pusher({
	appId: '922127',
	key: 'e2940972e6de5b249d99',
	secret: '61716bcf135bbd78f37c',
	cluster: 'eu',
	useTLS: true
});

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(cookieParser());
app.use(cors());


//Routes (TODO: move to routes file)

const withAuth = (req, res, next) => {
	const {
		token
	} = req.cookies;

	if (!token) {
		res.status(401).send('Unauthorized: No token provided');
	} else {
		jwt.verify(token, secret, async function (err, decoded) {
			if (err) {
				res.status(401).send('Unauthorized: Invalid token');
			} else {
				req.email = decoded.email;
				next();
			}
		});
	}
};

const createToken = (email) => {
	const payload = {
		email
	};
	const token = jwt.sign(payload, secret, {
		expiresIn: '1h'
	});

	return token;
}

app.get('/api/checktoken', withAuth, async (req, res) => {
	let { email } = req;
	let user = await User.findOne({ email });
	if (user) return res.status(200).send(user);
});

app.post('/api/register', async (req, res) => {
	const {
		userName,
		email,
		password
	} = req.body;
	const user = new User({
		userName,
		email,
		password
	});

	try {
		await user.save();
		let token = createToken(email);

		res.cookie('token', token, {
			httpOnly: true
		});
		res.status(200).send(user);
	} catch (error) {
		res.status(500).send('Error registering new user. Please try again later.');
		console.error(error);
	}
});

app.post('/api/authenticate', async (req, res) => {
	const {
		email,
		password
	} = req.body;

	try {
		let user = await User.findOne({ email });

		if (!user) {
			return res.status(401).send({
				message: 'User does not exist, please create an account!',
				newUser: true
			});
		} else {
			user.isCorrectPassword(password, (err, same) => {
				if (err) {
					return res.status(500).send({
						message: 'Internal server error'
					});
				} else if (!same) {
					return res.status(401).send({
						message: 'Incorrect email or password',
						newUser: false
					});
				} else {
					let token = createToken(email);

					res.cookie('token', token, {
						httpOnly: true
					});
					return res.status(200).send(user);
				}
			});
		}
	} catch (error) {
		console.error(error);
	}
});

app.get('/api/logout', function (req, res) {
	// jwtr.destroy(token)
	return res.status(200);
});

app.get(`/api/polls`, withAuth, async (req, res) => {
	try {
		let polls = await Poll.find();
		if (polls) return res.status(200).send(polls);
	} catch (error) {
		console.error(error);
	}
});

app.get('/api/poll/:pollId', withAuth, async (req, res) => {
	let {
		pollId
	} = req.params;
	try {
		let poll = await Poll.findById(pollId);
		if (poll) return res.status(200).send(poll);
	} catch (error) {
		console.error(error);
	}
});

app.post('/api/vote', withAuth, async (req, res, next) => {
	let {
		pollId,
		choice
	} = req.body;

	let identifier = `choices.${choice}.votes`;

	console.log('params are ', pollId, choice, identifier);
	// try {
	// 	let poll = await Poll.update(
	// 		{ _id: pollId },
	// 		{ $inc: { [identifier]: 1 } }
	// 	);

	// 	return res.status(200).send({ error: false, poll });
	// } catch (error) {
	// 	console.error(error);
	// }
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