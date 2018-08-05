const express = require('express')
const router = express.Router()

const Model = require('../../models/user')
const util = require('../../middleware/utilities')

// Get all users
router.get('/users', util.async(async (req, res, next) => {
	const users = await Model.find({}, { __v: 0, password: 0 }, { sort: { createdAt: 1 }})
	res.json(users)
}))

// Get one user
router.get('/users/:id', util.async(async (req, res, next) => {
	const users = await Model.findById(req.params.id, { __v: 0, password: 0 })
	res.json(users)
}))

module.exports = router
