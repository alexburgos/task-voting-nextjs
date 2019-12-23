const express = require('express');
const bodyParser = require('body-parser');

// IMPORT MODELS HERE

const app = express();

app.use(bodyParser.json());

//IMPORT ROUTES HERE


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