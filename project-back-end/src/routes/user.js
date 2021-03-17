const { json } = require('body-parser');
const e = require('express');
const express = require('express');


const router = express.Router();

const User = require('../model/users');


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

// router.post('/getUser', async (req, res) => {
	
// 	try {
// 		const user= await User.find({})
		
// 		const user1 = user.map(e =>{
// 			 if(e._id == req.body._id) 
// 			 return e})
// 		user1.push(post:[})
// 		res.status(200).send(user1).catch((e)=>console.log(e))
// 		} catch (err) {
// 		res.status(500).send();
// 	}
// });


// 3.to view a particular user
router.post('/getUser', async (req, res) => {
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
				   posts:[postDetails]
		   }

	   })
	   
	console.log(userDetails);  

   

    // console.log(postDetails);  

	const comment= await Comment.find({post_id:req.body.post_id})
	//    console.log(post);
	const commentDetails= post.map((e)=>{
		 return{
				   _id:e._id,
				   comment_text:e.comment_text,
				   up_vote:e.up_vote,
				   down_vote:e.down_vote,
				   replys:[]
			   }

	   })

	//    postDetails.map((e)=>{
	// 	if(e._id== req.body.post_id)
	// 	e.comments.push(commentDetails)
	// })


    const userPost = userDetails.map((e)=>{
		//  console.log(e);
		 e.posts.push(postDetails)
	 })
//  console.log(userPost);
			 
		res.status(200).send(userDetails).catch((e)=>console.log(e))
		
		} catch (err) {
			res.status(500).send({error:err.message});
		}
	});




// 2.update a user
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
           
			return res.status(404).send({ error: 'User not found' });
		}
		updates.forEach((update) => {
			user[update] = req.body[update];
		});
		await user.save();
		res.send(user);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error'});
	}
});
// 3.delete a user
router.delete('/deleteUser', async (req, res) => {
    
	try {
		const user = await User.findOneAndDelete({_id:req.body._id});
		if (!user) {
			return res.status(404).send({ error: 'User not found' });
		}
		res.send(user);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});
module.exports = router;