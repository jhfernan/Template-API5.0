const express = require('express')
const router = express.Router()

const users = require('./users')
const messages = require('./messages')

// Add API routes
router.use(users)
router.use(messages)

module.exports = router
