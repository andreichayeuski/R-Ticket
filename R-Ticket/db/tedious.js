const config = require('./config.json');

module.exports = () =>
{
	var Connection = require('tedious').Connection;

	var configuration = {
		userName: config.login,
		password: config.password,
		server: config.host,

		// If you're on Windows Azure, you will need this:
		options: {
			encrypt: true,
			database: config.db,
			instanceName: config.define.instanceName
		}
	};

	var connection = new Connection(configuration);
	console.log('tedious');
	connection.on('connect', (err) =>
	{
		var result = 1;

		console.log('connected');
		if (err)
		{
			console.log(err);
			return 0;
		}
		else
		{
			console.log('connected');
			result = connection;
		}
		return result;
	});

	return connection;
};