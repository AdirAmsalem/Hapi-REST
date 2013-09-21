// Load modules
var fs = require('fs');
var db = require('mongoskin').db('localhost:27017/hapi-rest', { safe: false });

// Initialize 'users' collection
var usersData = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
db.collection('users').remove();
db.collection('users').insert(usersData, function(error) {
	if (!error) {
		console.log('Initialized \'users\' collection');
	}
	db.close();
});