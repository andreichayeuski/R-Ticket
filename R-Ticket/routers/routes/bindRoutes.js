const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(bodyParser.json());

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	let trains = [], routesStation = [];
	req.db.sequelize.query('GetTrain')
		.then((result) => {
			console.log(result[0]);
			trains = result[0];
			req.db.sequelize.query('GetRoutesStation')
				.then((result) => {
					console.log(result[0]);
					routesStation = result[0];
					req.db.sequelize.query('GetRoutes')
						.then((result) => {
							console.log(result[0]);
							let routes = result[0];
							console.log(trains);
							console.log(routesStation);
							console.log(routes);
							res.render('index',
								{
									layout: 'routes/bind',
									trains: trains,
									routesStations: routesStation,
									routes: routes
								});
						})
						.error((err) => {
							console.log(err);
						});

				})
				.error((err) => {
					console.log(err);
				});
		})
		.error((err) => {
			console.log(err);
		});
});

router.post('/', urlencodedParser, (req, res) => {
	console.log(req.body);
	req.db.sequelize.query('BindRoutesStation :routesStationId, :trainId, :depTime, :arrTime', {
		replacements:
			{
				routesStationId: parseInt(req.body.routesStationId),
				trainId: parseInt(req.body.trainId),
				depTime: req.body.depTime,
				arrTime: req.body.arrTime
			}
	})
		.then((result) => {
			console.log(result[0][0]);
			if (result[0][0].result === 1)
			{
				res.redirect('http://r-ticket.chav:6608/routes/bind');
			}
			else
			{

			}
		})
		.error((err) => {
			console.log(err);
		});
});

module.exports = router;