var http = require('http');
var path = require('path');
var fs = require("fs");
var mime = require("mime");
var urlH = require("url");
var qs = require('querystring');
var formidable = require('formidable');
var MongoClient = require('mongodb').MongoClient;
var dburl = "mongodb://localhost:27017/";

http.createServer(function(req, res) {

	res.render = function(filename) {
		fs.readFile(filename, function(err, data) {
			if (err) {
				res.writeHead(404);
				res.write("Not Found! No data! ");
			} else {
				res.setHeader('Content-Type', mime.getType(filename));
				res.write(data);
			}
			res.end();
		});
	}
	var url = req.url;
	var method = req.method.toLowerCase();
	if (url.startsWith("/index")) {
		if (method === 'get') {
			res.render(path.join(__dirname, 'views', 'index.html'));
		}
	} else if (url.startsWith("/abme")) {
		if (method === 'get') {
			
			res.render(path.join(__dirname, 'views', 'abme.html'));
		} else if (method === 'post') {
			var array = [];
			req.on('data', function(chunk) {
				array.push(chunk);
			});
			req.on('end', function() {
				var postBody = Buffer.concat(array);
				postBody = postBody.toString("utf8")
				postBody = qs.parse(postBody);
				abme(postBody, res);
			});
		}
	}  else if(url.startsWith("/editUser") && method == 'post') {
		var array = [];
			req.on('data', function(chunk) {
				array.push(chunk);
			});
			req.on('end', function() {
				var postBody = Buffer.concat(array);
				postBody = postBody.toString("utf8")
				postBody = qs.parse(postBody);
				editUserHandle(postBody,res)
				//myBM(postBody, res);
			});
	}else if (url.startsWith("/myBM")) {
		if (method === 'get') {
			res.render(path.join(__dirname, 'views', 'myBM.html'));
		} else if (method === 'post') {
			var array = [];
			req.on('data', function(chunk) {
				array.push(chunk);
			});
			req.on('end', function() {
				var postBody = Buffer.concat(array);
				postBody = postBody.toString("utf8")
				postBody = qs.parse(postBody);
				myBM(postBody, res);
			});
		}
	} else if (url.startsWith("/postA")) {
		if (method === 'get') {
			res.render(path.join(__dirname, 'views', 'postA.html'));
		} else if (method === 'post') {
			var array = [];
			req.on('data', function(chunk) {
				array.push(chunk);
				//console.log(array.push(chunk));
			});
			req.on('end', function() {
				var postBody = Buffer.concat(array);
				postBody = postBody.toString("utf8")
				postBody = qs.parse(postBody);
				findPostA(postBody, res);
			});
		}
	} else if (url.startsWith("/addP")) {
		if (method === 'get') {
			res.render(path.join(__dirname, 'views', 'addP.html'));
		} else if (method === 'post') {
			var array = [];
			req.on('data', function(chunk) {
				array.push(chunk);
			});
			req.on('end', function() {
				var postBody = Buffer.concat(array);
				postBody = postBody.toString("utf8")
				//console.log("alex co=" + postBody);
				postBody = qs.parse(postBody);
				
				addP(postBody, res);
			});
		}
	} else if (url.startsWith("/deleteP")) {
		if (method === 'post') {
			var array = [];
			req.on('data', function(chunk) {
				array.push(chunk);
			});
			req.on('end', function() {
				var postBody = Buffer.concat(array);
				postBody = postBody.toString("utf8")
				postBody = qs.parse(postBody);
				deleteP(postBody, res);
			});
		}
	} else if (url.startsWith("/addBook") && method === 'post') {
		var array = [];
		req.on('data', function(chunk) {
			array.push(chunk);
		});
		req.on('end', function() {
			var postBody = Buffer.concat(array);
			postBody = postBody.toString("utf8");
			postBody = qs.parse(postBody);
			var data = {
				pid: postBody.pid,
				userid: postBody.userid
			};
			
			addBook(data, res);
		});

	} else if (url.startsWith("/editP")) {
		if (method === 'get') {
			res.render(path.join(__dirname, 'views', 'editP.html'));
		} else if (method === 'post') {
			var array = [];
			req.on('data', function(chunk) {
				array.push(chunk);
			});
			req.on('end', function() {
				var postBody = Buffer.concat(array);
				postBody = postBody.toString("utf8")
				postBody = qs.parse(postBody);
				editP(postBody, res);
			});
		}
	} else if (url.startsWith("/login")) {
		if (method === 'get') {
			res.render(path.join(__dirname, 'views', 'signin.html'));
		} else if (method === 'post') {
			var array = [];
			req.on('data', function(chunk) {
				array.push(chunk);
			});
			req.on('end', function() {
				var postBody = Buffer.concat(array);
				postBody = postBody.toString("utf8")
				postBody = qs.parse(postBody);
				var username = postBody.username;
				var password = postBody.password;
				findUserByInfo(postBody, res);
			});
		}
	} else if (url.startsWith("/deleteF")) {
		if (method === 'post') {
			var array = [];
			req.on('data', function(chunk) {
				array.push(chunk);
			});
			req.on('end', function() {
				var postBody = Buffer.concat(array);
				postBody = postBody.toString("utf8")
				postBody = qs.parse(postBody);
				deleteF(postBody, res);
			});
		}
	} else if (url.startsWith("/regist")) {
		if (method === 'get') {
			res.render(path.join(__dirname, 'views', 'reg.html'));
		} else if (method === 'post') {
			var array = [];
			req.on('data', function(chunk) {
				array.push(chunk);
			});
			req.on('end', function() {
				var postBody = Buffer.concat(array);
				postBody = postBody.toString("utf8");
				postBody = qs.parse(postBody);
				regist(postBody, res);
			});
		}
	} else if (url.startsWith("/findByUsername")) {
		if (method === 'post') {
			var array = [];
			req.on('data', function(chunk) {
				array.push(chunk);
			});
			req.on('end', function() {
				var postBody = Buffer.concat(array);
				postBody = postBody.toString("utf8")
				postBody = qs.parse(postBody);
				findUserByUserName(postBody, res);
			});
		}
	} else if (url.startsWith("/assets") && method === 'get') {
		res.render(path.join(__dirname, url));
	} else {
		console.log("Requested URL is: " + req.url);
		res.end();
	}
}).listen(9999, function() {
	console.log("is working");
})

var dbName = "blog";

function regist(data, res) {
	data.uuid = guid();
	MongoClient.connect(dburl, {
		useNewUrlParser: true, useUnifiedTopology: true
	}, function(err, db) {
		if (err) throw err;
		var dbo = db.db(dbName);
		dbo.collection("users").insertOne(data, function(err, result) {
			if (err) throw err;
			res.end("success");
			db.close();
		});
	});
}

function editUserHandle(data, res){
	MongoClient.connect(dburl, {
		useNewUrlParser: true, useUnifiedTopology: true
	}, function(err, db) {
		if (err) throw err;
		var dbo = db.db(dbName);
		var whereStr = {
			"uuid": data.uuid
			}; // which requirements to take 
		delete data.uuid;
		
		var updateStr = {
			$set: data
		};
		
		dbo.collection("users").updateOne(whereStr, updateStr, function(err, obj) {
			if (err) throw err;

			dbo.collection("users").find(whereStr).toArray(function(err, result) { // collection
				if (err) throw err;
				if (result.length == 1) {
					res.write(JSON.stringify(result[0]));
					res.end();
				} else {
					res.end("error");
				}
				db.close();
			});

			// res.end("success");
			// db.close();
		});
	});

}


function addP(data, res) {
	var uuid = guid();
	data.uuid = uuid;
	MongoClient.connect(dburl, {
		useNewUrlParser: true, useUnifiedTopology: true
	}, function(err, db) {
		if (err) throw err;
		var dbo = db.db(dbName);
		dbo.collection("p").insertOne(data, function(err, result) {
			if (err) throw err;
			res.end(uuid);
			db.close();
		});
	});
}

function findPostA(data, res) {
	MongoClient.connect(dburl, {
		useNewUrlParser: true, useUnifiedTopology: true
	}, function(err, db) {
		if (err) throw err;
		var dbo = db.db(dbName);
		var whereStr = {
			"uuid": data.uuid,
		};
		dbo.collection("p").find(whereStr).toArray(function(err, result) { // find data from collection 
			if (err) throw err;
			res.end(JSON.stringify(result));
			db.close();
		});
	});
}

function findUserByInfo(data, res) {
	MongoClient.connect(dburl, {
		useNewUrlParser: true, useUnifiedTopology: true
	}, function(err, db) {
		if (err) throw err;
		var dbo = db.db(dbName);
		var whereStr = {
			"username": data.username,
			'password': data.password
		};
			dbo.collection("users").find(whereStr).toArray(function (err, result) { // find data from collection 
			if (err) throw err;
			if (result.length == 1) {
				res.write(JSON.stringify(result[0]));
				res.end();
			} else {
				res.end("error");
			}
			db.close();
		});
	});
}

function findUserByUserName(data, res) {
	MongoClient.connect(dburl, {
		useNewUrlParser: true, useUnifiedTopology: true
	}, function(err, db) {
		if (err) throw err;
		var dbo = db.db(dbName);
		var whereStr = {
			"username": data.username
		};
			dbo.collection("users").find(whereStr).toArray(function (err, result) { // find data from collection 
			if (err) throw err;
			if (result.length <= 0) {
				res.end("success");
			} else {
				res.end("error");
			}
			db.close();
		});
	});
}

function myBM(data, res) {
	MongoClient.connect(dburl, {
		useNewUrlParser: true, useUnifiedTopology: true
	}, function(err, db) {
		if (err) throw err;
		var dbo = db.db(dbName);
		console.log(data.userid)
		var whereStr = {
			"userid": data.userid
		};
		dbo.collection('p_fav').aggregate([{
			$lookup: {
				from: 'p', // main collection
				localField: 'pid', // collection id
				foreignField: 'uuid', // the unique id
				as: 'pInfo' // gen the data by（array）
			}
		},
		{
			$match: whereStr
		}
	]).toArray(function(err, result) {
			if (err) throw err;
			// filtering the deleted and bookmarked items
			result = result.filter(item => {
				return item.pInfo.length > 0;
			});
			
			res.end(JSON.stringify(result));
			db.close();
		});
	});
}

function deleteP(data, res) {
	MongoClient.connect(dburl, {
		useNewUrlParser: true, useUnifiedTopology: true
	}, function(err, db) {
		if (err) throw err;
		var dbo = db.db(dbName);
		var whereStr = {
			"uuid": data.uuid
		};
		
		dbo.collection("p").deleteOne(whereStr, function(err, obj) {
			if (err) throw err;
			res.end("success");
			db.close();
		});
	});
}
function deleteF(data, res) {
	MongoClient.connect(dburl, {
		useNewUrlParser: true, useUnifiedTopology: true
	}, function(err, db) {
		if (err) throw err;
		var dbo = db.db(dbName);
		var whereStr = {
			"uuid": data.uuid
		};
		
		dbo.collection("p_fav").deleteOne(whereStr, function(err, obj) {
			if (err) throw err;
			res.end("success");
			db.close();
		});
	});
}

function editP(data, res) {
	MongoClient.connect(dburl, {
		useNewUrlParser: true, useUnifiedTopology: true
	}, function(err, db) {
		if (err) throw err;
		var dbo = db.db(dbName);
		var whereStr = {
			"uuid": data.uuid
		}; // check the uuid
		
		var updata = {
			number: data.number,
			date: data.date,
			location: data.location,
			meters: data.meters,
			message: data.message,
			title: data.title,
			kg: data.kg,
			url: data.url,
		};
		var updateStr = {
			$set: updata
		};
		
		dbo.collection("p").updateOne(whereStr, updateStr, function(err, obj) {
			if (err) throw err;
			res.end("success");
			db.close();
		});
	});
}

function abme(data, res) {
	MongoClient.connect(dburl, {
		useNewUrlParser: true, useUnifiedTopology: true
	}, function(err, db) {
		if (err) throw err;
		var dbo = db.db(dbName);
		var userid = data.userid;
		var whereStr = {
			"userid": data.userid
		};
		dbo.collection('p').aggregate([
			{
				$lookup: {
					from: 'p_fav', // the bookmark collection
					localField: 'uuid', // the uuid
					foreignField: 'pid', // 
					as: 'book', // gen the data 
				}
		    },
			{
				$match: whereStr
			}
	]).toArray(function(err, result) {
			if (err) throw err;
			
			var resultArr = [];
			result.forEach(function(v,k){
				var book = v.book;
				var isBook = false;
				if(book.length > 0){
					for (var j = 0; j < book.length; j++) {
						// console.log('book[j].userid:' + book[j].userid);
					   if (book[j].pid == v.uuid) {
						   isBook = true;
							break;
					   }
				   }
				}
				
				v.isBook = isBook;
				resultArr.push(v);
			})
			// for (var i = 0; i < result.length; i++) {
			// 	var book = result[i].book;
			// 	console.log('book',book)
			// 	//console.log('book.length:' + book.length);
			// 	if (book.length <= 0) {
			// 		result[i].isBook = false;
			// 		delete result[i].book;
			// 		resultArr.push(result[i]);
			// 		continue;
			// 	}
			// 	var isBook = false;
			// 	if(book[0].pid  && book[0].pid == result[i].uuid){
			// 		isBook = true;
			// 	}
			// 	// for (var j = 0; i < book.length; j++) {
			// 	// 	// console.log('book[j].userid:' + book[j].userid);
			// 	// 	if (book[j].userid == userid) {
			// 	// 		isBook = true;
			// 	// 		break;
			// 	// 	}
			// 	// }
			// 	result[i].isBook = isBook;
			// 	delete result[i].book;
			// 	resultArr.push(result[i]);
			// }
			res.end(JSON.stringify(resultArr));
			db.close();
		});
	});
}

function addBook(data, res) {
	data.uuid = guid();
	MongoClient.connect(dburl, {
		useNewUrlParser: true, useUnifiedTopology: true
	}, function(err, db) {
		if (err) throw err;
		var dbo = db.db(dbName);
		dbo.collection("p_fav").insertOne(data, function(err, result) {
			if (err) throw err;
			res.end("success");
			db.close();
		});
	});
}

function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}


