const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const auth = require('../../middleware/auth')
const config = require('../../config')
const util = require('../../middleware/utilities')
const User = require('../../models/user')

const defFilter = { __v: 0 }

// Authentication handler
router.route('/api/authenticate')
.get(auth.checkToken, util.async(async (req, res, next) => {
	res.json({ user: req.decoded })
}))
.post(util.async(async (req, res, next) => {
	const user = await User.findOne({ username: req.body.username }, defFilter)
	if (!user) {
		next(util.error(404, 'User not found'))
	} else if (!user.validPassword(req.body.password, user.password)) {
		next(util.error(403, 'Bad credentials'))
	} else if (user.validPassword(req.body.password, user.password)) {
		jwt.sign({
			id: user._id,
			name: user.name,
			last: user.last,
			username: user.username,
			admin: user.admin
		}, config.secret, { expiresIn: '7d' }, (err, token) => {
			res.json({ token: token })
		})
	}
}))

module.exports = router
