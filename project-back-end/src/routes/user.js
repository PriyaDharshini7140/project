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
	   const user= await User.find()
	//    console.log(user);
	const userDetails= user.map((e)=>{
		   if(e._id == req.body._id)
		   {
			   return({
				   _id:e._id,
				   name: e.name,
				   age:e.age,
				   phone_number: e.phone_number,
				   email_id: e.email_id,
				   gender:e.gender,
				   password:e.password,
				   post:[]
			   })
}
		   else{
			return res.status(404).send({ error: 'User not found' });
		   }
	   })
	   
	    



	   const post = await Post.find()
        //  console.log(post);
       const postDetails= post.map((e)=>{
		if(e.user_id == req.body.user_id)
		{
			
			return({
				_id:e._id,
				user_name: e.user_name,
				post_text:e.post_text,
				post_url: e.post_url,
				category: e.category,
				up_vote:e.up_vote,
				down_vote:e.down_vote,
				comments:[]
			})
			
        }
		else{
		 return res.status(404).send({ error: 'post not found' });
		}
	})





	const comment = await Comment.find()
	//  console.log(comment);
   const commentDetails= comment.map((e)=>{
	if(e.user_id == req.body.user_id && e.post_id == req.body.post_id )
	{

		return({
			_id:e._id,
			user_name: e.user_name,
		comment_text:e.comment_text,
			post_url: e.post_url,
			category: e.category,
			up_vote:e.up_vote,
			down_vote:e.down_vote,
			replys:[]
		})
		
	}
	else{
	 return res.status(404).send({ error: 'post not found' });
	}
})
// console.log(commentDetails);
 

 postDetails.map(e =>{
	if(e.user_id == req.body.user_id && e.post_id == req.body.post_id )
	return e.comments.push(commentDetails)
 })




  userDetails.map(e =>{
		if(e._id == req.body._id)
		return e.post.push(postDetails)
	 })
	

			 
		res.status(200).send(userDetails).catch((e)=>console.log(e))
		
		} catch (err) {
			res.status(500).send();
		}
	});




// // 2.update a user
// router.patch('/updateUser/:id', async (req, res) => {
// 	const updates = Object.keys(req.body);
//     console.log(updates);
// 	const allowedUpdates = ['first_name','last_name','password'];
// 	const isValidOperation = updates.every((update) => {
// 		return allowedUpdates.includes(update);
// 	});

// 	if (!isValidOperation) {
// 		return res.status(400).send({ error: 'Invalid Operation' });
// 	}

// 	try {
// 		const user = await User.findById(req.params.id)
//         console.log(user);
// 		if (!user) {
           
// 			return res.status(404).send({ error: 'User not found' });
// 		}
// 		updates.forEach((update) => {
// 			user[update] = req.body[update];
// 		});
// 		await user.save();
// 		res.send(user);
// 	} catch (error) {
// 		res.status(500).send({ error: 'Internal server error'});
// 	}
// });
// // 3.delete a user
// router.delete('/deleteUser/:id', async (req, res) => {
    
// 	try {
// 		const user = await User.findByIdAndDelete(req.params.id);
// 		if (!user) {
// 			return res.status(404).send({ error: 'User not found' });
// 		}
// 		res.send(user);
// 	} catch (error) {
// 		res.status(500).send({ error: 'Internal server error' });
// 	}
// });
module.exports = router;