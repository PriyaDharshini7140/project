
const express = require('express');


const router = express.Router();

const User = require('../../model/UserModel/users');


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

// 2. to view all user(newFeeds)
router.post('/newFeed', async (req, res) => {
		try {

			const post= await Post.find()
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


	   const user= await User.find()
	
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


//3 to view a user's profile
	router.post('/UserProfile', async (req, res) => {
		try {

			const post= await Post.find()
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


	   const user= await User.find({_id:req.body._id})
	
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

//update user profile
	router.patch('/updateUser/:id', async (req, res) => {
		const updates = Object.keys(req.body);
		console.log(updates);
		const allowedUpdates = ['user_name','age','phone_number','password','profile_picture'];
		const isValidOperation = updates.every((update) => {
			return allowedUpdates.includes(update);
		});
	
		if (!isValidOperation) {
			return res.status(400).send({ error: 'Invalid Operation' });
		}
	
		try {
			const user = await User.findById(req.params.id)
			console.log(user);
			if (!user) {
			   
				return res.status(404).send({ error: 'user not found' });
			}
			updates.forEach((update) => {
				user[update] = req.body[update];
			});
			await user.save();
			res.send(user);
		} catch (err) {
			res.status(500).send({ error: err.message});
		}
	});
	// 3.delete a user 
	router.delete('/deleteUser', async (req, res) => {
		
		try {
			const user = await User.findOne({_id:req.body._id},(err,u)=>{
				if(err){
					console.log(err);
				}
				else{
                    
					Post.find({user_id:req.body.user_id},(err,p)=>{
						if(err){
							console.log(err);
						}
						else{
						  Comment.find({user_id:req.body.user_id},(err,c)=>{
							  if(err){
								  console.log(err);
							  }
							  else{
								  Reply.find({},(err,r)=>{
									  if(err){
										  console.log(err);
									  }
									  else{
										  r.map((rep)=>{
											 
											  if(u._id.toString() === rep.user_id.toString()){
											     return rep.remove()
											//   console.log(rep);
											  }
										  })
		  
									  }
								  })
								  c.map((com)=>{
									  // console.log(e);
									  if(u._id.toString() === com.user_id.toString()){
									     return com.remove()
									//   console.log(com);
									  }
								  })
							  }
							  p.map((pos)=>{
								  // console.log(e);
								  if(u._id.toString() === pos.user_id.toString()){
								     return pos.remove()
								//   console.log(pos);
								  }
							  })
						  })
		  
						  
						}
				  });
				}
			})
			
			
		if (!user) {
			return res.status(404).send({ error: 'user not found' });
		}
		user.remove()
		res.send(user);
		} catch (err) {
			res.status(500).send({error:err.message});
		}
	});









module.exports = router;