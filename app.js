const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')

const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')
const config = require('./config')

const general = require('./routes/app/index')
const apiV1 = require('./routes/v1/index')

const app = express()

app.use(helmet())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors({ origin: config.options }))

// Establish Mongodb connection with mongoose
mongoose.connect(config.db, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
	// require('./public/mock/seed.js')
	console.log('Successfully connected to mongo db!')
})

// Set routes
app.use('/', general)
app.use('/api/v1', apiV1)

// catch 404 and forward to error handler
app.use((req, res, next) => {
	var err = new Error('Not Found')
	err.status = 404
	next(err)
})

// error handler
app.use((err, req, res, next) => {
	let error = {
		status: err.status || 500,
		message: err.message || 'Internal Server Error'
	}
	res.status(error.status).json({ message: error.message, status: error.status})
})

module.exports = app
