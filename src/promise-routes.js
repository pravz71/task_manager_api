app.post('/users', (req, res) => {
	const user = new User(req.body);
	user.save().then((result) => {
		res.send(user);
	}).catch((error) => {
		res.status(400);
		res.send(error);
	});
});

app.get('/users', (req, res) => {
	User.find({}).then((users) => {
		res.send(users);
	}).catch((error) => {
		res.status(500).send(error);
	});
});

app.get('/users/:id', (req, res) => {
	const _id = req.params.id;
	User.findById(_id).then((user) => {
		if(!user) {
			return res.status(404).send();
		}
		res.send(user);
	}).catch((error) => {
		res.status(500).send(error);
	});
});

app.post('/tasks', (req, res) => {
	const task = new Task(req.body);
	task.save().then((result) => {
		res.send(result);
	}).catch((error) => {
		res.status(400).send(error);
	});
});

app.get('/tasks', (req, res) => {
	Task.find({}).then((tasks) => {
		res.send(tasks);
	}).catch((error) => {
		res.status(500).send(error);
	});
});

app.get('/tasks/:id', (req, res) => {
	const _id = req.params.id;
	Task.findById(_id).then((task) => {
		if(!task) {
			return res.status(404).send();
		}
		res.send(task);
	}).catch((error) => {
		res.status(500).send(error);
	});
});

User.findByIdAndUpdate('5d6fb08e17b6623d30782fb4', { age: 15 }).then((user) => {
	console.log(user);
	return User.countDocuments({name:  'Pravin Gupta'});
}).then((count) => {
	console.log(count);
}).catch((error) => {
	console.log(error);
});

Task.findByIdAndDelete('5d763abce2be0469d41cdada').then((task) => {
	console.log(task);
	return Task.countDocuments({ completed: false });
}).then((count) => {
	console.log('Count: ', count);
}).catch((error) => {
	console.log(error);
});

const deleteTaskAndCount = async (id) => {
	const task = await Task.findByIdAndDelete(id);
	const count = await Task.countDocuments( { completed: false} );
	return count;
}

deleteTaskAndCount('5d6fb51acf01ab401c81c237').then((count) => {
	console.log(count);
}).catch((error) => {
	console.log(error);
});