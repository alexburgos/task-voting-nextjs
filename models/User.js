const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.pre('save', (next) => {
	if (this.isNew || this.isModified('password')) {
		const document = this;
		bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
			if (err) {
				next(err);
			} else {
				document.password = hashedPassword;
				next();
			}
		});
	} else {
		next();
	}
});

userSchema.methods.isCorrectPassword = function(password, callback) {
	bcrypt.compare(password, this.password, function(err, same) {
		if (err) {
			callback(err);
		} else {
			callback(err, same);
		}
	});
};

module.exports = mongoose.model('User', userSchema);