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

// 2.to view all comment

router.post('/getComment', async (req, res) => {
	try {
	 await Comment.find({user_id:req.body.user_id,post_id:req.body.post_id})
	.then((e)=>res.status(201).send({data:e}))
	.catch((e)=>console.log(e));
	} catch (err) {
		res.status(500).send();
	}
});

// 3.to view a particular comment
router.post('/get_a_Comment', async (req, res) => {
	try {
	 await Comment.findOne({user_id:req.body.user_id,post_id:req.body.post_id,_id:req.body._id})
	.then((e)=>res.status(201).send({data:e}))
	.catch((e)=>console.log(e));
	} catch (err) {
		res.status(500).send();
	}
});


module.exports = router;