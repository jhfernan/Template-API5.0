const express = require('express')
const router = express.Router()

// Home page
router.get('/', (req, res, next) => {
	res.send('API 5.0 Home page')
})

module.exports = router
