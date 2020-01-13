const mongoose = require('mongoose');

mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost:27017/planning-poker',
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

const Poll = require('../models/Poll');

const tasks = [
	'Make Breakfast',
	'Walk the dog',
	'Commute to work',
	'Build a cool app'
];

// empty the collection first
Poll.deleteMany({})
	.then(() => {
		let polls = [];
		for (let i = 0; i < tasks.length; i++) {
			polls.push({
				taskName: tasks[i],
				taskDescription: 'We have to do something!',
				choices: [
					{
						value: 0,
						votes: 0
					},
					{
						value: 0.5,
						votes: 0
					},
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
						value: 5,
						votes: 0
					},
					{
						value: 8,
						votes: 0
					},
					{
						value: 13,
						votes: 0
					}
				]
			});
		}
		return Poll.create(polls);
	})
	.then(() => {
		process.exit();
	})
	.catch(e => {
		console.log(e);
		process.exit(1);
	});
