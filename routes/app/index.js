const express = require('express')
const router = express.Router()

const app = require('./app')
const session = require('./session')

// Add API routes
router.use(app)
router.use(session)

module.exports = router
