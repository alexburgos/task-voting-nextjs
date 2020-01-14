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
						index: 0,
						points: '0',
						votes: 0
					},
					{
						index: 1,
						points: '0.5',
						votes: 0
					},
					{
						index: 2,
						points: '1',
						votes: 0
					},
					{
						index: 3,
						points: '3',
						votes: 0
					},
					{
						index: 4,
						points: '5',
						votes: 0
					},
					{
						index: 5,
						points: '8',
						votes: 0
					},
					{
						index: 6,
						points: '13',
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
