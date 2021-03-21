const express = require('express');
const admin = require('../../model/AdminModel/admin');


const router = express.Router();

const Admin = require('../../model/AdminModel/admin');


//1. admin profile
router.post('/adminProfile', async (req, res) => {
	const adminProfile = new Admin(req.body);
	try {
		await adminProfile.save()
		.then((e)=>res.status(201).send({data:e}))
		.catch((e)=>console.log(e));
		} catch (err) {
		res.status(500).send();
	}
});

router.post('/adminLogin', async (req, res) => {
	try {

		const adminLogin= await Admin.find({})
		
       const adminLoggedIn =  adminLogin.map((e)=>{
            if (e.email_id == req.body.email_id && e.password == req.body.password) {

                return({

                    name:e.name,
                    email_id:e.email_id,
                    password:e.password,
                    profile_picture:e.profile_picture

                 } )
                
            }
        })
			 
	res.status(200).send(adminLoggedIn).catch((e)=>console.log(e))
	
	} catch (err) {
		res.status(500).send({error:err.message});
	}
});

router.patch('/adminProfileUpdate/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    console.log(updates);
    const allowedUpdates = ['name','password','profile_picture'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Operation' });
    }

    try {
        const admin = await Admin.findById(req.params.id)
        console.log(admin);
        if (!admin) {
           
            return res.status(404).send({ error: 'admin not found' });
        }
        updates.forEach((update) => {
            admin[update] = req.body[update];
        });
        await admin.save();
        res.send(admin);
    } catch (err) {
        res.status(500).send({ error: err.message});
    }
});
module.exports = router;