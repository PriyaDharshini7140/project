const express = require('express');

var nodemailer = require('nodemailer');

const router = express.Router();
const { checkPermission } = require('../../middleware/CheckPermission');
const Post = require('../../model/UserModel/post');


const Report = require('../../model/UserModel/reports');

router.post('/reported',checkPermission(),async (req, res) => {
	const newPost = new Report(req.body);
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

router.post('/reports',checkPermission(),async (req, res) => {
	
	try {
		const status = await Report.find({}).populate("user_id").populate({
            path: 'post_id',
            model: 'posts',
            populate: {
              path: 'user_id',
              model: 'users',
            }}).sort({createdAt: 'desc'});
		if (!status) {
			return res.status(404).send({ error: 'Status not found' });
		}
		res.send(status);
	} catch (err) {
		res.status(500).send({ error: err.message});
	}
});
router.delete('/deleteReport/:id',checkPermission(),async (req, res) => {
   
	try {
		const reply = await Report.findByIdAndDelete(req.params.id);
		if (!reply) {
			return res.status(404).send({ error: 'reply not found' });
		}
		res.send(reply);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});
router.delete('/deleteReportedPost/:id/:pid',checkPermission(),async (req, res) => {
   
	try {
		// var transporter = nodemailer.createTransport({
		// 	service: 'outlook',
		// 	auth: {
		// 	  user: 'ideawrapper@outlook.com',
		// 	  pass: 'Priya7140'
		// 	}
		//   });
		//   console.log(email);
		//   var mailOptions = {
		// 	from: 'ideawrapper@outlook.com',
		// 	to: "riaharshini1998@gmail.com",
		// 	subject: 'Post deleted',
		// 	text: `Hi your post has been removed due to inappropriate content`
		//   };
		  
		//   transporter.sendMail(mailOptions, function(error, info){
		// 	if (error) {
		// 	  console.log(error);
		// 	} else {
		// 	  console.log('Email sent: ' + info.response);
		// 	}
		//   });
		const reply = await Report.findByIdAndDelete(req.params.id);
		if (!reply) {
			return res.status(404).send({ error: 'reply not found' });
		}
		
        const post = await Post.findByIdAndDelete(req.params.pid).populate("user_id");
		const email = post.user_id.email_id;
		const name = post.user_id.user_name;
		console.log(email,name);
		if (!post) {
			return res.status(404).send({ error: 'reply not found' });
		}
		console.log(post);
		 res.send(reply);
		  res.send(post);
		 
		  
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
	
});
module.exports = router;