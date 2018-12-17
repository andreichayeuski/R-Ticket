const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const clientSessions = require("client-sessions");

router.use(clientSessions({
	cookieName: 'user',
	secret: '0GBlJZ9EKBt2Zbi2flRPvztczCewBxXK' // set this to a long random string!
}));

router.all('/*', async (req, res, next) => {
	console.log('Auth...');
	console.log(req.user);
	if (req.user !== undefined)
	{
		req.db = require('../db/db')(Sequelize, req.user.username, req.user.password);
	}
	else
	{
		req.db = require('../db/db')(Sequelize);
	}
	next();
});

module.exports = router;