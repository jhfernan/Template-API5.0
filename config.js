config = {
	origins: 'http://localhost:3000',
	db: 'mongodb://localhost:27017/api50',
	secret: 'IfIspinaroundclockwiseforsomereason,Ihavetospinaroundcounterclockwiserightawaysoastounwindmyself.',
}

if (process.env.NODE_ENV == 'production') {
	config.db = process.env.MONGODB_URI
	config.secret = process.env.SECRET
	config.origins = 'http://localhost:3000 http://localhost:3000'
}

config.options = function (origin, callback) {
	if (!origin) {
		callback(null, true)
	}
	if (config.allowedOrigins.includes(origin)) {
		callback(null, true)
	} else {
		callback(new Error('Not allowed by CORS'))
	}
}

module.exports = config
