const express = require('express');
const router = express.Router();
const createTrain = require('./createTrain');
const db = require('../../db/db')(require('sequelize'));

router.use('/create', createTrain);

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	let trains = [];
	db.sequelize.query('GetTrain')
		.then((result) => {
			console.log(result[0]);
			trains = result[0];
			res.render('index',
				{
					layout: 'train/train',
					trains: trains
				});
		})
		.error((err) => {
			console.log(err);
		});
});

module.exports = router;