const express = require('express');



const router = express.Router();

const Verification = require('../../model/userModel/verification');
const { checkPermission } = require('../../middleware/CheckPermission');


router.post('/verification', async (req, res) => {
	const verification = new Verification(req.body);
	try {
		await verification.save()
		.then((e)=>res.status(201).send(e))
		.catch((e)=>console.log(e));
		} catch (err) {
		res.status(500).send();
	}
});
router.post('/adminVerification',async(req,res)=>{
	const post = await Verification.findOne({ _id:req.body._id});
	post.user_id = req.body.user_id,
	post.admin_id = req.body.admin_id,
	post.status = req.body.status
try {
	await post.save();
	res.status(201).send(post);
} catch (err) {
	res.status(500).send({error:err.message});
}
})
router.post('/getReq',checkPermission(),async(req,res)=>{
	const post = await Verification.find({}).populate('user_id').sort({createdAt: 'desc'});

try {
	
	res.status(201).send(post);
} catch (err) {
	res.status(500).send({error:err.message});
}
})
router.delete('/deleteReq/:id',checkPermission(),async (req, res) => {
    // console.log(req.body._id);
	console.log(req.params.id);
	try {
		const req = await Verification.findByIdAndDelete(req.params.id);
		if (!req) {
			return res.status(404).send({ error: 'reply not found' });
		}
		res.send(req);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});
module.exports = router;