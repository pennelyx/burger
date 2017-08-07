var connection = require ("./connection.js");

var printQ = function (num) {
	var arr=[];
	for (var i = 0; i < num; i++) {
		arr.push("?");
	}
	return arr.toString();
};


var orm = {
	selectAll: function(tableName,callBack) {
		var queryString = "SELECT * FROM "+ tableName + ";";
		connection.query(queryString, function(err, result){
			if (err) {
				throw err;
			}
			callBack(result);
		});
	},
	insertOne: function(table, cols, vals, callBack) {
		var queryString = "INSERT INTO " + table;
		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQ(vals.length);
		queryString += ")";

		console.log(queryString);

		connection.query(queryString, vals, function(err, result){
			if (err) {
				throw err;
			}
			callBack(result);
		});
	},
	updateOne: function(table, newVal, condition, callBack) {
		var queryString = "UPDATE " + table;
		queryString += " SET ";
		queryString += newVal;
		queryString += " WHERE ";
		queryString += condition;

		console.log(queryString);
		connection.query(queryString, function(err, result) {
			if (err) {
        		throw err;
      		}

      		callBack(result);
		}); 
	}
};


module.exports = orm; 