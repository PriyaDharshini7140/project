const express = require('express');

const router = express.Router();

const Reply = require("../model/reply")
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
// 2.to view all reply
router.post('/getReply', async (req, res) => {
	try {
	 await Reply.find({user_id:req.body.user_id,comment_id:req.body.comment_id})
	.then((e)=>res.status(201).send({data:e}))
	.catch((e)=>console.log(e));
	} catch (err) {
		res.status(500).send();
	}
});

// 3.to view a particular reply
router.post('/get_a_Reply', async (req, res) => {
	try {
	 await Reply.findOne({user_id:req.body.user_id,comment_id:req.body.comment_id,_id:req.body._id})
	.then((e)=>res.status(201).send({data:e}))
	.catch((e)=>console.log(e));
	} catch (err) {
		res.status(500).send();
	}
});

module.exports = router;