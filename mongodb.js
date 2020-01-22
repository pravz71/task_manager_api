const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";
MongoClient.connect(connectionURL,  { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
	if(error) {
		return console.log('Unable to connect to the database!!');
	}
	console.log('Connected correctly');
	const db = client.db(databaseName);
	// db.collection('users').insertOne({
	// 	name: 'Pravin',
	// 	age: 24
	// },(error, result) => {
	// 	if(error) {
	// 		return console.log('Unable to insert user');
	// 	}
	// 	console.log(result.ops);
	// });
	// db.collection('users').insertMany([
	// 	{
	// 		name: 'ifn',
	// 		age: 2421
	// 	},
	// 	{
	// 		name: 'ifjskgjn',
	// 		age: 421
	// 	}
	// ], (error, result) => {
	// 	if(error) {
	// 		return console.log('Unable to insert user');
	// 	}
	// 	console.log(result.ops);
	// });
	// db.collection('tasks').insertMany([
	// 	{
	// 		description: 'ifn',
	// 		completed: true
	// 	},
	// 	{
	// 		description: 'seldom',
	// 		completed: false
	// 	},
	// 	{
	// 		description: 'random',
	// 		completed: false
	// 	}, 
	// ], (error, result) => {
	// 	if(error) {
	// 		return console.log('Unable to insert task');
	// 	}
	// 	console.log(result.ops);
	// });
	// db.collection('users').findOne({name:'Pracxvin'})
	// .then((data) => console.log(data));
	// db.collection('users').find({}).toArray((error, users) => {
	// 	if(error) {
	// 		return console.log('Unable to find users');
	// 	}
	// 	console.log(users);
	// });
	// db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
	// 	if(error) {
	// 		return console.log('Unable to find tasks');
	// 	}
	// 	console.log(tasks);
	// });
	// const updatePromise = db.collection('users').updateOne({
	// 	name: "Pravin"
	// },{
	// 	$set: {
	// 		name: "Navin",
	// 		age: 21
	// 	}
	// });

	// updatePromise.then((result) => {
	// 	console.log(result.ops);
	// }).catch((error) => {
	// 	console.log(error);
	// });
	// db.collection('tasks').updateMany({
	// 	completed: false
	// }, {
	// 	$set: {
	// 		completed: true
	// 	}
	// }).then((result) => {
	// 	console.log("Successful");
	// }).catch((error) => {
	// 	console.log("Try Again");
	// });

	// db.collection('users').deleteMany({
	// 	name: "Pravin"
	// }).then((result) => {
	// 	console.log(result);
	// }).catch((error) => {
	// 	console.log(error);
	// });
	// db.collection('users').deleteOne({
	// 	name: "Navin Gupta"
	// }).then((result) => {
	// 	console.log(result);
	// }).catch((error) => {
	// 	console.log(error);
	// });
	db.collection('users').find({}).toArray((error, users) => {
		if(error) {
			return console.log('Unable to find users');
		}
		console.log(users);
	});
});

// Run mongo server:-  C:\Users\PR20020852>mongodb\bin\mongod.exe --dbpath=\Users\PR20020852\mongodb-data