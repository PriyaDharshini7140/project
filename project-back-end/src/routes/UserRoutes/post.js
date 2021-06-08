const express = require('express');


const router = express.Router();
const { checkPermission } = require('../../middleware/CheckPermission');


const Post = require('../../model/UserModel/post');

//1. add a new post
router.post('/addPost',checkPermission(), async (req, res) => {
	const newPost = new Post(req.body);
	console.log(newPost);
	try {
		console.log(newPost);
		await newPost.save()
		.then((e)=>res.status(201).send(e))
		.catch((e)=> console.log(e))
	} catch (err) {
		res.status(500).send();
	}
});


//update user post
router.patch('/updatePost/:id/:pid', async (req, res) => {
	const user = await User.findById(req.params.id);
	const updates = Object.keys(req.body);
	console.log(updates);
	const allowedUpdates = ['idea_title','scope','post_text','post_url','category','link','enhancement','requirements'];
	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid Operation' });
	}

	try {
       const post = await Post.findById(req.params.pid)
		console.log(post);
		if (!post) {
		   
			return res.status(404).send({ error: 'post not found' });
		}
		if(user._id.toString() === post.user_id.toString()){
			updates.forEach((update) => {
				post[update] = req.body[update];
			});
			await post.save();
			res.send(post);
		}
		else{
			return res.send({ error: 'This user is not allowed to edit this post' });
		}
		
	} catch (err) {
		res.status(500).send({ error: err.message});
	}
});


router.post('/like',checkPermission(),async(req,res)=>{
		const post = await Post.findOne({ _id:req.body._id});
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
		res.status(500).send();
	}
})

router.post('/dislike',checkPermission(),async(req,res)=>{
	const post = await Post.findOne({ _id:req.body._id});
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
// 3.delete a post
router.delete('/deletePost/:id',checkPermission(), async (req, res) => {
	// console.log("delete post",req.body._id);
	try {
		const post = await Post.findById(req.params.id,(err,p)=>{
			
              if(err){
				  console.log(err);
			  }
			  else{
				Comment.find({},(err,c)=>{
					// console.log(post_id);
					if(err){
						console.log(err);
					}
					else{
						Reply.find({},(err,r)=>{
							if(err){
								console.log(err);
							}
							else{
                                c.map((comments)=>{
									// console.log(comments);
 								r.map((replys)=>{
										if(comments._id.toString() === replys.comment_id.toString())
										{
                                            return replys.remove()
											
										}
									})
								})

							}
						})
						c.map((e)=>{
							// console.log(e);
							if(p._id.toString() === e.post_id.toString()){
							   return e.remove()
							}
						})
					}
				})
				
			  }
		});
		
		if (!post) {
			return res.status(404).send({ error: 'post not found' });
		}
		post.remove()
		
		res.send(post);

	} catch (error) {
		res.status(500).send({ error:err.message});
	}
});




module.exports = router;