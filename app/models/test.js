var mysql = require('mysql');

var connection = mysql.createConnection({
	host     	: 'localhost',
	user     	: 'boris',
	password : '12345',
	database	: 'internet-store', 	
	port: 3306
});

connection.connect();

connection.query("SELECT * from `products`", function (error, results) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

connection.end();

