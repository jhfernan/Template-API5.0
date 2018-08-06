const express = require('express')
const router = express.Router()

const util = require('../../middleware/utilities')

// Home page
router.get('/', util.async(async (req, res, next) => {
	res.send('API 5.0 Home page')
}))

module.exports = router
