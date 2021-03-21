const express = require('express');



const router = express.Router();

const Verification = require('../../model/AdminModel/verification');


//1. admin profile
router.post('/verification', async (req, res) => {
	const verification = new Verification(req.body);
	try {
		await verification.save()
		.then((e)=>res.status(201).send({data:e}))
		.catch((e)=>console.log(e));
		} catch (err) {
		res.status(500).send();
	}
});

module.exports = router;