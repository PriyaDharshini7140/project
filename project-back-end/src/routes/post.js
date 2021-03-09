const express = require('express');

const router = express.Router();

const User = require('../model/users');

const Post = require('../model/post');




//1. add a new post
router.post('/addPost/:id', async (req, res) => {
	const newPost = new Post(req.body);
	try {
        const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).send({ error: 'User not found' });
		}
        user.posts.push(newPost)

		await user.save();
		res.status(201).send(user);
	} catch (err) {
		res.status(500).send();
	}
});
// 2.to view all post
router.get('/getPost/:id', async (req, res) => {
	try {
        const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).send({ error: 'User not found' });
		}
		res.status(201).send(user.posts);
	} catch (err) {
		res.status(500).send();
	}
});
// 3.particular post 
router.get('/getUser/:id/getPost/:pid', async (req, res) => {
	try {
        const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).send({ error: 'User not found' });
		}
      const filter=  user.posts.map((e)=>{
          if(e._id == req.params.pid)
              return e
         })
		res.status(201).send(filter);
	} catch (err) {
		res.status(500).send();
	}
});

router.delete('/:id/deletePost/:pid', async (req, res) => {
   
	const UserId = req.params.id;
	const PostId = req.params.pid;
    // console.log(UserId,PostId);
	try {
		const user = await User.findById(UserId);
        // console.log(user);
		
		if (!user) {
			return res.status(404).send({ error: 'user not found' });
		}
		user.posts.map((e)=>{
            if(e._id == PostId)
           console.log(e)
        })
	    await user.save()
		res.send(user);
		} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});
module.exports = router;