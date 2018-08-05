const User = require('../../models/user')

let seededData = [
	User({
		name: 'Jonathan',
		last: 'Fernandes',
		username: 'admin',
		password: 'admin',
		admin: true,
	}),
	User({
		name: 'James',
		last: 'Fernandes',
		username: 'noadmin',
		password: 'noadmin'
	}),
	User({
		name: 'Josiah',
		last: 'Fernandes',
		username: 'josiahf',
		password: 'noadmin'
	}),
	User({
		name: 'Sarah',
		last: 'Fernandes',
		username: 'sarahf',
		password: 'noadmin'
	})
]

for (let seedData of seededData) {
	seedData.save(function(err) {
		if (err) {
			console.error('Seeding Error', err.message)
		}
		console.log('Data created!')
	})
}
