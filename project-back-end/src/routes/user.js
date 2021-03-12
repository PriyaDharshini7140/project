const express = require('express');

const router = express.Router();

const User = require('../model/users');


//1. add a new user
router.post('/addUser', async (req, res) => {
	const newUser = new User(req.body);
	try {
		await newUser.save()
		.then((e)=>res.status(201).send({data:e}))
		.catch((e)=>console.log(e));
		} catch (err) {
		res.status(500).send();
	}
});

// 3.to view a particular user
router.post('/getUser', async (req, res) => {
		try {
	     await User.findOne({_id:req.body._id})
		.then((e)=>res.status(201).send({data:e}))
		.catch((e)=>console.log(e));
		} catch (err) {
			res.status(500).send();
		}
	});




// // 2.update a user
// router.patch('/updateUser/:id', async (req, res) => {
// 	const updates = Object.keys(req.body);
//     console.log(updates);
// 	const allowedUpdates = ['first_name','last_name','password'];
// 	const isValidOperation = updates.every((update) => {
// 		return allowedUpdates.includes(update);
// 	});

// 	if (!isValidOperation) {
// 		return res.status(400).send({ error: 'Invalid Operation' });
// 	}

// 	try {
// 		const user = await User.findById(req.params.id)
//         console.log(user);
// 		if (!user) {
           
// 			return res.status(404).send({ error: 'User not found' });
// 		}
// 		updates.forEach((update) => {
// 			user[update] = req.body[update];
// 		});
// 		await user.save();
// 		res.send(user);
// 	} catch (error) {
// 		res.status(500).send({ error: 'Internal server error'});
// 	}
// });
// // 3.delete a user
// router.delete('/deleteUser/:id', async (req, res) => {
    
// 	try {
// 		const user = await User.findByIdAndDelete(req.params.id);
// 		if (!user) {
// 			return res.status(404).send({ error: 'User not found' });
// 		}
// 		res.send(user);
// 	} catch (error) {
// 		res.status(500).send({ error: 'Internal server error' });
// 	}
// });
module.exports = router;