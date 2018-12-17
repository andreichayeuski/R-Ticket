const express = require('express');
const router = express.Router();
const createUser = require('./createUser');

router.use('/create', createUser);

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	let user = [];
	req.db.sequelize.query('GetUser')
		.then((result) => {
			console.log(result[0]);
			user = result[0];
			res.render('index',
				{
					layout: 'user/user',
					users: user
				});
		})
		.error((err) => {
			console.log(err);
		});
});

module.exports = router;