config = {
	origins: 'http://localhost:3000',
	db: 'mongodb://localhost:27017/api50',
	secret: 'IfIspinaroundclockwiseforsomereason,Ihavetospinaroundcounterclockwiserightawaysoastounwindmyself.',
}

if (process.env.NODE_ENV == 'production') {
	config.db = process.env.MONGODB_URI
	config.secret = process.env.SECRET
	config.origins = 'https://example-cb-frontend.herokuapp.com/'
}

config.options = (origin, callback) => {
	!origin || config.origins.includes(origin)
		? callback(null, true)
		: callback(new Error('Not allowed by CORS'))
}

module.exports = config
