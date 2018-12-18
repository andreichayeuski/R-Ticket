const express = require('express');
const router = express.Router();
const createCar = require('./createCar');
const bindCar = require('./bindCar');

router.use('/create', createCar);
router.use('/bind', bindCar);

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	let cars = [];
	req.db.sequelize.query('GetCar')
		.then((result) => {
			console.log(result[0]);
			cars = result[0];
			res.render('index',
				{
					layout: 'car/car',
					cars: cars
				});
		})
		.error((err) => {
			console.log(err);
			res.redirect('http://r-ticket.chav:6608');
		});
});

module.exports = router;