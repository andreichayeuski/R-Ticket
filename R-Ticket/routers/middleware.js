const express = require('express');
const router = express.Router();
const db = require('../db/db');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const clientSessions = require("client-sessions");

router.use(clientSessions({
	secret: '0GBlJZ9EKBt2Zbi2flRPvztczCewBxXK' // set this to a long random string!
}));

router.all('/*', async (req, res, next) => {
	console.log('Auth...');
	next();
	/*res.cookie('cart', 'test', {expires: new Date(Date.now() + 300), httpOnly: true});
	await db.Managers.findByPk(dec.id).then((itm) =>
	{
		if (itm)
		{
			console.log(itm);
			console.log("1");
			req.manager = itm.get({raw: true});
			next();
		}
		else
		{
			console.log("2");
			res.status(403).send('403');
		}
	});*/
});

module.exports = router;