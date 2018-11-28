const express = require('express');
const router = express.Router();
const createCruising = require('./createCruising');
const db = require('../../db/db')(require('sequelize'));

router.use('/create', createCruising);

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	db.sequelize.query('GetCruising')
		.then((result) => {
			console.log(result[0]);
			res.render('index',
				{
					layout: 'cruising/cruising',
					cruising: result[0]
				});
		})
		.error((err) => {
			console.log(err);
		});

});

module.exports = router;