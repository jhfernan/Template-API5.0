const express = require('express')
const router = express.Router()

const util = require('../../middleware/utilities')

// Get all users
router.post('/messages', util.async(async (req, res, next) => {
	res.io.emit('newMessage', req.body)
	res.json({ message: 'Success' })
}))

module.exports = router
