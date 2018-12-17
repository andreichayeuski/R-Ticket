const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../../db/db')(require('sequelize'));

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(bodyParser.json());

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	res.render('index',
		{
			layout: 'login'
		});
});

router.post('/', urlencodedParser, (req, res) => {
	console.log(req.body);
	db.sequelize.query('LoginIntoRTicket :login, :password', {
		replacements:
			{
				login: req.body.login,
				password: req.body.password
			}
	})
		.then((result) => {
			console.log(result[0][0]);
			if (result[0][0].result === -1)
			{
				res.redirect('http://r-ticket.chav:6608/login');
			}
			else
			{
				res.redirect('http://r-ticket.chav:6608');
			}
		})
		.error((err) => {
			console.log(err);
		});
});

module.exports = router;