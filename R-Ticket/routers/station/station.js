const express = require('express');
const router = express.Router();
const createStation = require('./createStation');
const db = require('../../db/db')(require('sequelize'));

router.use('/create', createStation);

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	let stations = [];
	db.sequelize.query('GetStation')
		.then((result) => {
			console.log(result[0]);
			stations = result[0];
			res.render('index',
				{
					layout: 'station/station',
					stations: stations
				});
		})
		.error((err) => {
			console.log(err);
		});
});

module.exports = router;