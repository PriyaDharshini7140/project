const express = require('express');


const router = express.Router();
const { checkPermission } = require('../../middleware/CheckPermission');
const MvpComment = require('../../model/UserModel/SolutionComments')
const MvpReply = require("../../model/UserModel/SolutionReply")

const Solution = require('../../model/UserModel/solution');

//1. add a new post
router.post('/addSolution',checkPermission(), async (req, res) => {
	const mvp = new Solution(req.body);
	console.log(mvp);
	try {
		console.log(mvp);
		await mvp.save()
		.then((e)=>res.status(201).send(e))
		.catch((e)=> console.log(e))
	} catch (err) {
		res.status(500).send();
	}
});

router.post('/getMvp',checkPermission(), async (req, res) => {
    try {
        
   
    const post = await Solution.aggregate([{
        $lookup:{
         from:"mvpcomments",
         localField:'_id',
         foreignField:'solution_id',
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
    }]).sort({up_vote_count: 'desc'})
    
    
    res.status(200).send(post).catch((e)=>console.log(e))
    } catch (err) {
        res.status(500).send({error:err.message});
    }
});

router.patch('/updateSolution/:id/:pid',checkPermission(),async (req, res) => {
	const user = await User.findById(req.params.id);
	const updates = Object.keys(req.body);
	console.log(updates);
	const allowedUpdates = ['solution_title','link'];
	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid Operation' });
	}

	try {
       const post = await Solution.findById(req.params.pid)
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

router.post('/selected',checkPermission(),async(req,res)=>{
	const post = await Solution.findOne({ _id:req.body._id});
    console.log(post.selected);
	
try {

	if(post.selected === false){
		post.selected = true
		
	}
	else if(post.selected === true){
		post.selected = false
	}
	await post.save();
	res.status(201).send(post);
	
} catch (err) {
	res.status(500).send();
}
})
router.post('/like',checkPermission(),async(req,res)=>{
		const post = await Solution.findOne({ _id:req.body._id});
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
	const post = await Solution.findOne({ _id:req.body._id});
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
// // 3.delete a post
router.delete('/deleteMvp/:id',checkPermission(), async (req, res) => {
	// console.log("delete post",req.body._id);
	try {
		const post = await Solution.findById(req.params.id,(err,p)=>{
			
              if(err){
				  console.log(err);
			  }
			  else{
				MvpComment.find({},(err,c)=>{
					console.log("c",c);
					if(err){
						console.log(err);
					}
					else{
						MvpReply.find({},(err,r)=>{
							if(err){
								console.log(err);
							}
							else{
                                c.map((comments)=>{
									console.log("com",comments);
 								r.map((replys)=>{
                                     console.log("rep",replys.comment_id);
										if(comments._id.toString() === replys.comment_id.toString())
										{
                                           return replys.remove()
											
										}
									})
								})

							}
						})
						c.map((e)=>{
						 console.log("solution",e.solution_id);
							if(p._id.toString() === e.solution_id.toString()){
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