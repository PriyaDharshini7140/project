const express = require('express');

const router = express.Router();


const Comment = require('../model/comment')


//1. add a new Comment
router.post('/addComment', async (req, res) => {
	const newComment = new Comment(req.body);
	try {
		await newComment.save()
		.then((e)=>res.status(201).send({data:e}))
		.catch((e)=> console.log(e))
	} catch (err) {
		res.status(500).send();
	}
});

// 2.update a comment
router.patch('/updateComment/:id', async (req, res) => {
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
		const comment = await Comment.findById(req.params.id)
        console.log(comment);
		if (!comment) {
           
			return res.status(404).send({ error: 'comment not found' });
		}
		updates.forEach((update) => {
			comment[update] = req.body[update];
		});
		await comment.save();
		res.send(comment);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error'});
	}
});
// 3.delete a comment
router.delete('/deleteComment', async (req, res) => {
    
	try {
		const comment = await Comment.findOneAndDelete({_id:req.body._id});
		if (!comment) {
			return res.status(404).send({ error: 'comment not found' });
		}
		res.send(comment);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});


module.exports = router;