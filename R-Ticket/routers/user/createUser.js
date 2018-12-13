const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../../db/db')(require('sequelize'));

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(bodyParser.json());

router.get('/', (req, res) => {
	console.log(req.originalUrl);
	let user = [], role = [], country = [];
	db.sequelize.query('GetUser')
		.then((result) => {
			console.log(result[0]);
			user = result[0];
			db.sequelize.query('GetRole')
				.then((result) => {
					console.log(result[0]);
					role = result[0];
					db.sequelize.query('GetCountry')
						.then((result) => {
							console.log(result[0]);
							country = result[0];
							res.render('index',
								{
									layout: 'user/create',
									roles: role,
									countrys: country,
									users: user
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
	db.sequelize.query('CreateUser :FName, :SName, :MName, :Email, :Birthday, :Sex' +
		', :Passport, :FNameEn, :SNameEn, :Telephone, :Login, :Password, :CountryId, :RoleId',
		{
			replacements:
				{
					FName: req.body.fname,
					SName: req.body.sname,
					MName: req.body.mname,
					Birthday: req.body.birthday,
					Email: req.body.email,
					Sex: parseInt(req.body.sex),
					Passport: req.body.passport,
					FNameEn: req.body.fname_en,
					SNameEn: req.body.sname_en,
					Telephone: req.body.telephone,
					Login: req.body.login,
					Password: req.body.password,
					CountryId: parseInt(req.body.countryId),
					RoleId: parseInt(req.body.roleId)
				}
	})
		.then((result) => {
			console.log(result[0][0]);
			if (result[0][0].result === 1)
			{
				res.redirect('http://r-ticket.chav:6608/user/create');
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