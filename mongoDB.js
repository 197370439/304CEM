var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbName = "blog";
// MongoClient.connect(url, {
// 		useNewUrlParser: true
// 	}, function(err, db) {
// 		if (err) throw err;
// 		var dbo = db.db(dbName);
// 		dbo.collection("goods").find().toArray(function(err, result) { // collection data
// 			if (err) throw err;
// 			console.log(result);
// 		//	res.end(JSON.stringify(result));
// 			db.close();
// 		});
// 	});
	
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    // delete test collection
    dbo.collection("p").drop(function(err, delOK) {  // success delOK ，else false
        if (err) throw err;
        if (delOK) console.log("collection deleted");
        db.close();
    });
});