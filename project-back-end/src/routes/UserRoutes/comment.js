const express = require('express');


const router = express.Router();
const { checkPermission } = require('../../middleware/CheckPermission');

const Comment = require('../../model/UserModel/comment')


//1. add a new Comment
router.post('/addComment',checkPermission(), async (req, res) => {
	const newComment = new Comment(req.body);
	try {
		await newComment.save()
		.then((e)=>res.status(201).send(e))
		.catch((e)=> console.log(e))
	} catch (err) {
		res.status(500).send();
	}
});
router.post('/like',checkPermission(),async(req,res)=>{
	const post = await Comment.findOne({ _id:req.body._id});
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

router.post('/dislike',checkPermission(),async(req,res)=>{
const post = await Comment.findOne({ _id:req.body._id});
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
router.post('/getComment',checkPermission(),async (req, res) => {
	try {
		
		
           const comment = await Comment.aggregate([
			{
			$lookup:{
             from:"replys",
			 localField:'_id',
			 foreignField:'comment_id',
			 as:'replys'
			}
		},{
			$lookup:{
             from:"users",
			 localField:'user_id',
			 foreignField:'_id',
			 as:'user'
			}
		},{
			$unwind:"$user"
		}]).sort({createdAt: 'desc'})
		res.status(200).send(comment).catch((e)=>console.log(e))
		
	} catch (err) {
		res.status(500).send({error:err.message});
	}
});


// 3.delete a comment
router.delete('/deleteComment/:id',checkPermission(), async (req, res) => {
	console.log(req.params.id);
    // console.log("deletecomment",req);
	try {
		const comment = await Comment.findById(req.params.id,(err,c)=>{
			if(err){
				console.log(err);
			}
			else{
			  Reply.find({},(err,r)=>{
				  if(err){
					  console.log(err);
				  }
				  else{
					//   console.log(r);
					  r.map((e)=>{
						//   console.log(e);
						  if(c._id.toString() === e.comment_id.toString()){
							 return e.remove()
						  }
					  })
				  }
			  })
			  
			}
	  });
	  if (!comment) {
		  return res.status(404).send({ error: 'comment not found' });
	  }
	  comment.remove()
	  res.send(comment);
  } catch (error) {
	  res.status(500).send({ error:err.message});
  }
});

module.exports = router;