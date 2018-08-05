const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')

const config = require('./config')

const general = require('./routes/general')
const apiV1 = require('./routes/v1/index')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

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
	res.status(error.status).send(error.message)
})

module.exports = app
