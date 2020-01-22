const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();
const multer = require('multer');
const sharp = require('sharp');

// handles file upload
const upload = multer({
	// dest: 'avatars', // We will save it to User Model
	limits: {
		fileSize: 500000
	},
	fileFilter(req, file, cb) {
		if(! file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error('Please upload an image of type jpg/png/jpeg'));
		}
		cb(undefined, true);
	}
});

router.post('/users', async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({user, token});
	} catch (error) {
		res.status(400);
		res.send(error);
	}
});

router.post('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken(); //Calling on instance i.e. user and not User
		res.send({user, token});
	} catch (error) {
		res.status(400).send(error);
	}
});

router.post('/users/logout', auth, async(req, res,) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
		await req.user.save();
		res.send('successfully logged out');
	} catch(error) {
		res.status(500).send()
	}
});

router.post('/users/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send('successfully logged out from all sessions')
	} catch(error) {
		res.status(500).send('Error');
	}
});

router.get('/users/me', auth, async (req, res) => {
	res.status(200).send(req.user);
});

router.patch('/users/me', auth, async (req, res) => {
	// Checking if the user is updating a property that is not defined in the schema
	// like "height" in this case
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'email', 'password', 'age'];
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
	if( !isValidOperation ) {
		return res.status(400).send('Error: Invalid Updates!');
	}
	try {
		updates.forEach((update) => req.user[update] = req.body[update]);
		await req.user.save();
		// const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
		res.send(req.user);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/users/me', auth, async (req, res) => {
	const id = req.user._id;
	try {
		await req.user.remove();
		res.send(req.user);
	} catch  (error) {
		res.status(500).send(error);
	}
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
	const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
	req.user.avatar = buffer;
	await req.user.save();
	res.send()
}, (error, req, res, next) => {
	res.status(400).send({ error: error.message });
});

router.delete('/users/me/avatar', auth, async (req, res) => {
	req.user.avatar = undefined;
	await req.user.save();
	res.send()
});

router.get('/users/:id/avatar', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if(!user || !user.avatar) {
			throw new Error()
		}

		res.set('Content-Type', 'image/png');
		res.send(user.avatar);
	} catch(error) {
		res.status(400).send();
	}
});

module.exports = router;