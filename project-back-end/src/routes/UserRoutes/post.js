const express = require('express');
const { remove } = require('../../model/UserModel/post');

const router = express.Router();



const Post = require('../../model/UserModel/post');




//1. add a new post
router.post('/addPost', async (req, res) => {
	const newPost = new Post(req.body);
	try {
		console.log(newPost);
		await newPost.save()
		.then((e)=>res.status(201).send({data:e}))
		.catch((e)=> console.log(e))
	} catch (err) {
		res.status(500).send();
	}
});

router.post('/getPostByCategory', async (req, res) => {
	try {

			const post= await Post.find({category:req.body.category})
console.log(post);
			
				const postDetails= post.map((e)=>{
					
						return{
							_id:e._id,
							user_id:e.user_id,
							post_text:e.post_text,
							post_url:e.post_url,
							category:e.category,
							up_vote:e.up_vote,
							down_vote:e.down_vote,
							comments:[]
						}
					  })
   
   
		  const user= await User.aggregate(
		   [ { $match : { role : "user" } } ]
	   )
	   
	   const userDetails= user.map((e)=>{
	   
			   return {
				   _id:e._id,
				   user_name: e.user_name,
				   age:e.age,
				   phone_number: e.phone_number,
				   email_id: e.email_id,
				   gender:e.gender,
				   password:e.password,
				   profile_picture:e.profile_picture,
				   posts:[]
	   
		   }
			  
   
		  })
		  
		  userDetails.map((u)=>{
		   //    console.log(u);
			  postDetails.map((p)=>{
			   //    console.log(p);
				  if(u._id.toString() === p.user_id.toString()){
				   //    console.log(typeof u._id);
				   //    console.log(typeof p.user_id);
					   u.posts.push(p)
				  }
			  })
		  })
   
   
					
		   res.status(200).send(userDetails).catch((e)=>console.log(e))
		
			
		
		} catch (err) {
			res.status(500).send({error:err.message});
		}
});




// get particular post for post description with comments

router.post('/getPost', async (req, res) => {
	try {

		const post= await Post.find({_id:req.body._id})
		//    console.log(post);
		const postDetails= post.map((e)=>{
			 return{
					   _id:e._id,
					   user_id:e.user_id,
					   post_text:e.post_text,
					   post_url:e.post_url,
					   category:e.category,
					   up_vote:e.up_vote,
					   down_vote:e.down_vote,
					   comments:[]
				   }
	
		   })


		   const comment= await Comment.find()
		  
		   const commentDetails= comment.map((e)=>{
				return{
						  _id:e._id,
						  user_id:e.user_id,
						  user_name:e.user_name,
						  post_id:e.post_id,
						  comment_text:e.comment_text,
						  up_vote:e.up_vote,
						  down_vote:e.down_vote,
						  replys:[]
					  }
	   
			  })


    console.log(commentDetails);

   
	postDetails.map((p)=>{
	//    console.log(p);
	  commentDetails.map((c)=>{
		//    console.log(c);
		   if(p._id.toString() === c.post_id.toString()){
			
				p.comments.push(c)
		   }
	   })
   })


			 
	res.status(200).send(postDetails).catch((e)=>console.log(e))
	
	} catch (err) {
		res.status(500).send({error:err.message});
	}
});

//update user post
router.patch('/updatePost/:id/:pid', async (req, res) => {
	const user = await User.findById(req.params.id);
	const updates = Object.keys(req.body);
	console.log(updates);
	const allowedUpdates = ['post_text','post_url','category'];
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
			res.send(post,{error:"post updated"});
		}
		else{
			return res.send({ error: 'This user is not allowed to edit this post' });
		}
		
	} catch (error) {
		res.status(500).send({ error: err.message});
	}
});


router.post('/like',async(req,res)=>{
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

router.post('/dislike',async(req,res)=>{
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
router.delete('/deletePost/:id', async (req, res) => {
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