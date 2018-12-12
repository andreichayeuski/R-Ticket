const express = require('express');
const router = express.Router();
const createRoutes = require('./createRoutes');
const bindRoutes = require('./bindRoutes');
const db = require('../../db/db')(require('sequelize'));

router.use('/create', createRoutes);
router.use('/bind', bindRoutes);

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	let routes = [];
	db.sequelize.query('GetRoutes')
		.then((result) => {
			console.log(result[0]);
			routes = result[0];
			res.render('index',
				{
					layout: 'routes/routes',
					routes: routes
				});
		})
		.error((err) => {
			console.log(err);
		});
});

module.exports = router;