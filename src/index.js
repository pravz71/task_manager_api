const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;


// Middleware for maintenance
// app.use((req, res, next) => {
// 	res.status(503).send('Site is under maintenance');
// });

// Automatically parses the incoming json to an object
app.use(express.json());

// Registering the userRouter and taskRouter otherwise routes won't work as the app doesn't know about them
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
	console.log('App is running at port: ', port);
});
const User = require('./models/user');
const Task = require('./models/task');

const myFunction = async () => {
	// const task = await Task.findById('5d80d757df7d7540c0bcc74a');
	// await task.populate('owner').execPopulate();
	// console.log(task);

	// const user = await User.findById('5d80d66a7a802863c8d99bb9');
	// await user.populate('tasks').execPopulate();
	// console.log(user.tasks);
	const tasks = await Task.find({});
	console.log(tasks);
}
// myFunction();