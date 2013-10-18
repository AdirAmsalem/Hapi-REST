// Load modules
var app = require(__dirname + '/config');
var fs = app.getLib('fs');
var db = app.getLib('mongoskin');

// Initialize 'users' collection
var usersData = JSON.parse(fs.readFileSync(__dirname + '/../data/users.json', 'utf8'));
db.collection('users').remove();
db.collection('users').insert(usersData, function(error) {
	if (!error) {
		console.log('Initialized \'users\' collection');
	}
	db.close();
});