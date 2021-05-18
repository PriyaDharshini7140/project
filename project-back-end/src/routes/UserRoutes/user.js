
const express = require('express');


const router = express.Router();

const User = require('../../model/UserModel/users');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { CreateToken } = require('../../middleware/CreateToken');
const { checkPermission } = require('../../middleware/CheckPermission');


//1. add a new user
router.post('/addUser', async (req, res) => {
	const email =await  User.find({})
    email.map((e)=>{
		if(e.email_id === req.body.email_id){
			res.status(200).send({message:"email_id already exists"});
		}
		else if(e.user_name === req.body.user_name){
			res.status(200).send({message:"user name already exists"});
		}
	})

	bcrypt.hash(req.body.password,10,(err,hashedPass)=>{
		if (err) {
			res.json({error:err})
		}
	
const newUser = new User({
			user_name:req.body.user_name,
			email_id:req.body.email_id,
			password:hashedPass,
			role:req.body.role
	})
	try {
		    //   console.log(newUser);
			 newUser.save()
			.then((e)=>res.status(201).send({data:e,message:"Registered successfully  please login in "}))
			.catch((e)=>console.log(e));
			} catch (err) {
			res.status(500).send({error:err.message});
		}

	})
	
});

router.post('/login',(req,res)=>{
	var email=req.body.email_id
    var password=req.body.password
    console.log(email,password);
    User.findOne({email_id:email})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token = CreateToken(user);
					console.log(token);
                    res.send({
			message:"logged in successfully",
			_id:user._id,
			user_name:user.user_name,
			profile_picture:user.profile_picture,
			role:user.role,
			token
					});
                    
                }else{
                    res.json({
                        message:'password does not match'
                    })
                }
            })

        }else{
            res.json({
                message:"no user found"
            })
        }
    })
});


router.post('/particularUser',checkPermission(), async (req, res) => {
	try {
	  const user = await User.findOne({_id:req.user_id});
	  console.log(user);
	if(!user){
		res.status(404).send({error:"user not found"});
	}

		 res.status(200).send(user)
	 }
	
		
		 catch (err) {
			res.status(500).send({error:err.message});
		}
});


// 2. to view all user(newFeeds)
router.post('/newFeed',checkPermission(), async (req, res) => {
		try {
            
		// 	const post = await Post.find({}).populate("user_id").sort({createdAt: 'desc'})
		// res.status(200).send(post).catch((e)=>console.log(e))
		const post = await Post.aggregate([{
			$lookup:{
             from:"comments",
			 localField:'_id',
			 foreignField:'post_id',
			 as:'comments'
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
		
		
		res.status(200).send(post).catch((e)=>console.log(e))
		} catch (err) {
			res.status(500).send({error:err.message});
		}
	});

//update user profile
	router.patch('/updateUser/:id',checkPermission(), async (req, res) => {
	
		const updates = Object.keys(req.body);
		console.log(updates);
		const allowedUpdates = ['age','phone_number','profile_picture','description','gender'];
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
			res.status(500).send({error: err.message});
		}

	});
	// 3.delete a user 
	router.delete('/deleteUser/:id',checkPermission(), async (req, res) => {
		
		try {
			const user = await User.findById(req.params.id,(err,u)=>{
				if(err){
					console.log(err);
				}
				else{
                    
					Post.find({},(err,p)=>{
						if(err){
							console.log(err);
						}
						else{
						  Comment.find({},(err,c)=>{
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