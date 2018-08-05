const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'First name is required'],
		lowercase: true,
		trim: true,
		maxlength: 20
	},
	last: {
		type: String,
		required: [true, 'Last name is required'],
		lowercase: true,
		trim: true,
		maxlength: 20
	},
	username: {
		type: String,
		unique: [true, 'The username you supplied is already in use'],
		required: [true, 'The username is required'],
		lowercase: true,
		trim: true,
		minlength: [5, 'The username must be at least 5 characters'],
		maxlength: [21, 'The username cannot be more than 21 characters']
	},
	password: {
		type: String,
		required: [true, 'The password is required'],
		minlength: [5, 'Your password must be at least 5 characters long'],
		maxlength: [21, 'The username cannot be more than 21 characters']
	},
	admin: { type: Boolean, default: false },
	createdAt: {
		type: Date,
		default: Date.now
	}
})

UserSchema.pre('save', function(next) {
	let user = this
	if (user.password.length !== 60) {
		user.password = bcrypt.hashSync(user.password, 10)
	}
	next()
})

UserSchema.methods.validPassword = (password, userPassword) => {
	return bcrypt.compareSync(password, userPassword)
}

const User = mongoose.model('User', UserSchema)
module.exports = User
