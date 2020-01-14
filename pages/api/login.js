// The following code is taken from Next.JS examples
// github.com/zeit/next.js/tree/canary/examples/with-cookie-auth/

import fetch from 'isomorphic-unfetch';
import connectDb from '../../middleware/dbMiddleware';
import User from '../../models/User';

const handler = async (req, res) => {
	const { username } = await req.body;
	const url = `https://api.github.com/users/${username}`;

	try {
		const response = await fetch(url);

		if (response.ok) {
			const { id } = await response.json();

			let user = await User.findOne({ token: id });

			// if user already exists
			if (user) {
				return res
					.status(200)
					.json({ token: id, user, message: 'User log in' });
			} else {
				let user = new User({
					token: id,
					userName: username,
					votes: []
				});

				await user.save();
				return res
					.status(200)
					.json({ token: id, user, message: 'New user' });
			}
		} else {
			// https://github.com/developit/unfetch#caveats
			const error = new Error(response.statusText);
			error.response = response;
			throw error;
		}
	} catch (error) {
		const { response } = error;
		return response
			? res.status(response.status).json({ message: response.statusText })
			: res.status(400).json({ message: error.message });
	}
};

export default connectDb(handler);
