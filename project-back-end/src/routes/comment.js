const express = require('express');
const comment = require('../model/comment');

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

router.post('/getComment', async (req, res) => {
	try {

		const comment= await Comment.find({post_id:req.body.post_id})
		
		const commentDetails= comment.map((e)=>{
			 return{
				_id:e._id,
				post_id:e.post_id,
				comment_text:e.comment_text,
				up_vote:e.up_vote,
				down_vote:e.down_vote,
				replys:[]
				   }
	
		   })
   console.log(commentDetails);

		   const reply= await Reply.find()
		  
		   const replyDetails= reply.map((e)=>{
				return{
						  _id:e._id,
						  comment_id:e.comment_id,
						  reply_text:e.reply_text,
						  up_vote:e.up_vote,
						  down_vote:e.down_vote,
					  }
	   
			  })


    console.log(replyDetails);

   
	commentDetails.map((c)=>{
	
	  replyDetails.map((r)=>{
		
		   if(c._id.toString() === r.comment_id.toString()){
			
				c.replys.push(r)
		   }
	   })
   })


			 
	res.status(200).send(commentDetails).catch((e)=>console.log(e))
	
	} catch (err) {
		res.status(500).send({error:err.message});
	}
});

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
		const comment = await Comment.findOne({_id:req.body._id},(err,c)=>{
			if(err){
				console.log(err);
			}
			else{
			  Reply.find({comment_id:req.body.comment_id},(err,r)=>{
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