const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const favicon = require('serve-favicon');
const clientSessions = require("client-sessions");

const Handlebars = require('handlebars');
Handlebars.registerPartial('header', 'header');

Handlebars.registerHelper('time', (str) =>
{
	str = str.slice(0, 5);
	let text = Handlebars.escapeExpression(str);
	return new Handlebars.SafeString(
		text
	);
});

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(clientSessions({
	secret: '0GBlJZ9EKBt2Zbi2flRPvztczCewBxXK' // set this to a long random string!
}));

app.engine('hbs', hbs({
	extname: 'hbs',
	defaultLayout: 'main',
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/'
}));

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.set('view engine', 'hbs');

app.use('/*(train|station|routes|shedule|cruising|car|space|user|ticket)',
	require('./routers/middleware'));

app.use('/train', require('./routers/train/train'));
app.use('/station', require('./routers/station/station'));
app.use('/routes', require('./routers/routes/routes'));
app.use('/shedule', require('./routers/shedule/shedule'));
app.use('/cruising', require('./routers/cruising/cruising'));
app.use('/car', require('./routers/car/car'));
app.use('/space', require('./routers/space/space'));
app.use('/user', require('./routers/user/user'));
app.use('/ticket', require('./routers/ticket/ticket'));
app.use('/login', require('./routers/login/login'));


app.get('/', (req, res) => {
	res.render('index');
});

app.listen(6608, () => console.log('Example app listening on port 6608!'));