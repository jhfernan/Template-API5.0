const jwt = require('jsonwebtoken')

const config = require('../config')
const utils = require('./utilities')

const auth = {
	checkToken: (req, res, next) => {
		let bearerToken = req.headers.authorization.split(' ')
		let token = bearerToken[1]
		if (token) {
			jwt.verify(token, config.secret, (err, decoded) => {
				if (err) {
					next(utils.error(403, 'Token is not valid.'))
				}
				delete decoded.exp
				delete decoded.iat
				req.decoded = decoded
				next()
			})
		} else {
			next(utils.error(401, 'No token provided.'))
		}
	},

	isAdmin: (req, res, next) => {
		if (req.decoded.admin) {
			next()
		} else {
			next(utils.error(401, 'You are not authorized to use that resource.'))
		}
	}
}

module.exports = auth
