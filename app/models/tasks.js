var mysql = require('mysql');

var connection = mysql.createConnection({
	host     	: 'localhost',
	database	: 'internet-store', 
	user     	: 'boris',
	password : '12345',
	port: 3306
});

connection.connect();

var Tasks = {

	list: function(callback) {
		connection.query('SELECT * FROM products', callback);
	},

	category: function(sqlQuery,callback) {
		connection.query(sqlQuery, callback);
	},

	add: function(task, callback) {
		connection.query('INSERT INTO tasks SET ?', {task: task}, callback);
	},
	
	change: function(id, text, callback) {
		// TODO
	},

	complete: function(id, callback) {
		// TODO
	},

	delete: function(id, callback) {
		// TODO
	}
};


module.exports = Tasks;