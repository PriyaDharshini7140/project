const express = require('express');

const router = express.Router();

const Reply = require("../../model/UserModel/reply")
//1. add a new reply
router.post('/addReply', async (req, res) => {
	const newReply = new Reply(req.body);
	try {
		await newReply.save()
		.then((e)=>res.status(201).send({data:e}))
		.catch((e)=> console.log(e))
	} catch (err) {
		res.status(500).send();
	}
});
// 2.update a reply
router.patch('/updateReply/:id', async (req, res) => {
	const updates = Object.keys(req.body);
    console.log(updates);
	const allowedUpdates = ['up_vote','down_vote'];
	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid Operation' });
	}

	try {
		const reply = await Reply.findById(req.params.id)
        console.log(reply);
		if (!reply) {
           
			return res.status(404).send({ error: 'reply not found' });
		}
		updates.forEach((update) => {
			reply[update] = req.body[update];
		});
		await reply.save();
		res.send(reply);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error'});
	}
});
// 3.delete a reply
router.delete('/deleteReply', async (req, res) => {
    
	try {
		const reply = await Reply.findOneAndDelete({_id:req.body._id});
		if (!reply) {
			return res.status(404).send({ error: 'reply not found' });
		}
		res.send(reply);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});


module.exports = router;