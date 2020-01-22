const express = require('express');
const Task = require('../models/task');
const router = new express.Router();
const auth = require('../middleware/auth');

router.post('/tasks', auth, async (req, res) => {
	const task = new Task({
		...req.body,
		owner: req.user._id
	});
	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/tasks', auth, async (req, res) => {
	const match = {};
	const sort = {};
	if(req.query.completed) {
		match.completed = req.query.completed === 'true' 
		//Since req.query.completed returns a string "true" and not boolean
		//Here "completed" is the status of the tasks	
	}

	if(req.query.sortBy) {
		const parts = req.query.sortBy.split(':');
		// Eg: sortBy = createdAt:desc  or completed:asc where first part represents the
		// property we want to sort on and 2nd represent the order ascending or descending
		sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
	}

	try {
		// const tasks = await Task.find({ owner: req.user._id });
		await req.user.populate({
			path: 'tasks',
			match,
			options: {
				limit: parseInt(req.query.limit),
				skip: parseInt(req.query.skip),
				sort
			}
		}).execPopulate();
		res.send(req.user.tasks);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;
	try {
		const task = await Task.findOne({ _id, owner: req.user._id});
		if(!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.patch('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;
	const updates = Object.keys(req.body);
	const allowedUpdates = ['description', 'completed'];
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

	if( !isValidOperation ) {
		return res.status(400).send('Error: Invalid Updates!');
	}

	try {
		const task = await Task.findOne({ _id, owner: req.user._id });
		updates.forEach((update) => task[update] = req.body[update]);
		// const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true});
		if(!task) {
			return res.status(404).send();
		}		
		await task.save();
		res.send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;
	try {
		const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
		if(!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;