const express = require('express');
const router = express.Router();
const createSpace = require('./createSpace');
const removeSpace = require('./removeSpace');

const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(bodyParser.json());
router.use('/create', createSpace);
router.use('/remove', removeSpace);

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	let space = [];
	req.db.sequelize.query('GetSpace')
		.then((result) => {
			console.log(result[0]);
			space = result[0];
			req.db.sequelize.query('GetSpace')
				.then((result) => {
					console.log(result[0]);
					space = result[0];
					res.render('index',
						{
							layout: 'space/space',
							spaces: space
						});
				})
				.error((err) => {
					console.log(err);
					res.redirect('http://r-ticket.chav:6608');
				});
		})
		.error((err) => {
			console.log(err);
			res.redirect('http://r-ticket.chav:6608');
		});
});

router.post('/', urlencodedParser, (req, res) => {
	console.log(req.originalUrl);
	let space = [];
	req.db.sequelize.query('GetSpacesInCar :carSheduleId',
		{
			replacements:{
				carSheduleId: parseInt(req.body.carSheduleId)
			}
		})
		.then((result) => {
			space = result[0];
			req.db.sequelize.query('GetCarSheduleByPk :carSheduleId',
				{
					replacements:{
						carSheduleId: parseInt(req.body.carSheduleId)
					}
				})
				.then((result) => {
					console.log(result[0][0]);
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify({
						"spaces": space,
						"train": result[0][0]
					}));
				})
				.error((err) => {
					console.log(err);
					res.redirect('http://r-ticket.chav:6608');
				});
		})
		.error((err) => {
			console.log(err);
			res.redirect('http://r-ticket.chav:6608');
		});
});

module.exports = router;