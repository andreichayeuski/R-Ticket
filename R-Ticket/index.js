const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const favicon = require('serve-favicon');

const app = express();

app.engine('hbs', hbs({
	extname: 'hbs',
	defaultLayout: 'main',
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/'
}));

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.set('view engine', 'hbs');

app.use('/train', require('./routers/train/train'));
app.use('/station', require('./routers/station/station'));
app.use('/station', require('./routers/routes/routes'));

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(6608, () => console.log('Example app listening on port 6608!'));