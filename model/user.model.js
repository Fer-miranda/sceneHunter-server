const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
	userName: {
		type: String,
		required: [true, 'Username is required'],
		minlength: [3, 'Username must be at least 3 characters'],
		maxlength: [25, 'Username must be less than 25 characters'],
		validate: {
			validator: async function (name) {
				const user = await this.constructor.findOne({ userName: name });
				return !user;
			},
			message: 'Username is already registered'
		}
	},

	email: {
		type: String,
		required: [true, 'Email is required'],
		max: [30, 'Email must be less than 30 characters'],
		validate: {
			validator: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
			message: 'Please enter a valid email'
		},
		validate: {
			validator: async function (email) {
				const user = await this.constructor.findOne({ email: email });
				return !user;
			},
			message: 'Email is already registered'
		}
	},

	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: [5, 'Password must be at least 5 characters'],
		maxlength: [15, 'Password must be less than 15 characters']
	}

}, { timestamps: true });

UserSchema.pre('save', function (next) {
	bcrypt.hash(this.password, 10)
		.then(hash => {
			this.password = hash;
			next();
		})
});

const User = model('User', UserSchema);

module.exports = User;

