const express = require('express')
const router = express.Router()

const Model = require('../../models/user')
const util = require('../../middleware/utilities')

const defFilter = { __v: 0, password: 0 }
const defSort = { sort: { createdAt: 1 }}

// Get all users
router.get('/users', util.async(async (req, res, next) => {
	const users = await Model.find({}, defFilter, defSort)
	users ? res.json(users) : next(util.error(404, 'Users not found'))
}))

// Get one user
router.get('/users/:id', util.async(async (req, res, next) => {
	const user = await Model.findById(req.params.id, defFilter)
	user ? res.json(user) : next(util.error(404, 'User not found'))
}))

module.exports = router
