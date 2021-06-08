const express = require('express');

const router = express.Router();
const { checkPermission } = require('../../middleware/CheckPermission');
const MvpReply = require("../../model/UserModel/SolutionReply")
//1. add a new reply
router.post('/addReply',async (req, res) => {
	const newReply = new MvpReply(req.body);
	try {
		await newReply.save()
		.then((e)=>res.status(201).send(e))
		.catch((e)=> console.log(e))
	} catch (err) {
		res.status(500).send();
	}
});

router.post('/like',async(req,res)=>{
	const post = await MvpReply.findOne({ _id:req.body._id});
	const user = req.body.user_id
	const up = post.up_vote.includes(user)
	const down = post.down_vote.includes(user)
console.log(up);
if (up === true) {
	post.up_vote.remove(user)
}
else if(down === true){
	post.down_vote.remove(user)
	post.up_vote.push(user)
}
else{
	post.up_vote.push(user)
}
try {
	await post.save();
	res.status(201).send(post);
} catch (err) {
	res.status(500).send({error:err.message});
}
})

router.post('/dislike',async(req,res)=>{
const post = await MvpReply.findOne({ _id:req.body._id});
	const user = req.body.user_id
	const up = post.up_vote.includes(user)
	const down = post.down_vote.includes(user)
console.log(up);
if (up === true) {
	post.up_vote.remove(user)
	post.down_vote.push(user)
}
else if(down === true){
	post.down_vote.remove(user)
}
else{
	post.down_vote.push(user)
}
try {
	await post.save();
	res.status(201).send(post);
} catch (err) {
	res.status(500).send();
}
})
router.post('/getReply',async (req, res) => {
	try {
		
		
           const reply = await 
		   MvpReply.aggregate([
			{
			$lookup:{
             from:"users",
			 localField:'user_id',
			 foreignField:'_id',
			 as:'user'
			}
		},{
			$unwind:"$user"
		}]).sort({createdAt: 'desc'})
		res.status(200).send(reply).catch((e)=>console.log(e))
		
	} catch (err) {
		res.status(500).send({error:err.message});
	}
});
// 3.delete a reply
router.delete('/deleteReply/:id',async (req, res) => {
    // console.log(req.body._id);
	console.log(req.params.id);
	try {
		const reply = await MvpReply.findByIdAndDelete(req.params.id);
		if (!reply) {
			return res.status(404).send({ error: 'reply not found' });
		}
		res.send(reply);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});


module.exports = router;