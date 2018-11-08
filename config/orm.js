// In the `orm.js` file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.
var connection = require("../config/connection");

function printQuestionMarks(num){
	var arr = [];

	for (var i=0; i<num; i++){
		arr.push("?");
	}
	return arr.toString();

}

function objToSql(ob){
	var arr = [];

	for(var key in ob){
		var value = ob[key];
		if(Object.hasOwnProperty.call(ob, key)){
			if(typeof value === "string" && value.indexOf("") >= 0){
				value = " ' " + value + " ' ";
			}
			arr.push(key + "=" + value);
		}
	}
	return arr.toString();
}

var orm = {
    //      * `selectAll()`
    selectAll: function(tableInput, cb){
		var queryString = "SELECT * FROM " + tableInput + ";";
		connection.query(queryString, function(err,results){
			if(err){
				throw err;
			}
			cb(results);
		});
	},
//      * `insertOne()`
insertOne: function(table,cols,vals,cb){
	var queryString = "INSERT INTO " + table;

	queryString += "(";
	queryString += cols.toString();
	queryString += ")";
	queryString += "VALUES (";
	queryString += printQuestionMarks(vals.length);
	queryString += ")";

	console.log(queryString);

	connection.query(queryString,vals, function(err, results){
		if(err){
			throw err;
		}
		cb(results);
	});
},
//      * `updateOne()`
updateOne: function(table, objColVals, condition, cb){
	var queryString = "UPDATE " + table;
	queryString += "SET";
	queryString += objToSql(objColVals);
	queryString += " WHERE ";
	queryString += condition;

	console.log(queryString);
	connection.query(queryString, function(err, results){
		if(err){
			throw err;
		}
		cb(result);
	});
 },
};
//    * Export the ORM object in `module.exports`.
module.exports = orm;