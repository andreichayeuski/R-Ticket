const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(bodyParser.json());

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	res.render('index',
		{
			layout: 'backup/backup'
		});
});

router.post('/backup', urlencodedParser, (req, res) => {
	console.log(req.originalUrl);
	req.db.sequelize.query('CreateBackup')
		.then(() => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({
				"result": 1
			}));
		})
		.error(() => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({
				"result": 0
			}));
		});
});

router.post('/recovery', urlencodedParser, (req, res) => {
	console.log(req.originalUrl);
	console.log(req.user);
	require('../../db/db')(Sequelize, req.user.username, req.user.password, "master").sequelize.query('RecoveryFromBackup')
		.then(() => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({
				"result": 1
			}));
		})
		.error(() => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({
				"result": 0
			}));
		});
});

module.exports = router;