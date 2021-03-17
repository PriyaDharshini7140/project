
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
				   posts:[]
		   }

	   })
	   
       userDetails.map((u)=>{
		   console.log(u);
		   postDetails.map((p)=>{
			   console.log(p);
			   if(u._id.toString() == p.user_id.toString()){
				   
				    u.posts.push(p)
			   }
		   })
	   })


				 
		res.status(200).send(userDetails).catch((e)=>console.log(e))
		
		} catch (err) {
			res.status(500).send({error:err.message});
		}
	});




module.exports = router;