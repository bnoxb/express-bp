const router    = require('express').Router();
const User      = require('../models/User');

router.get('/all', async (req,res)=>{
    try{
        const users = await User.find({});

        res.json({
            status: 200,
            success: true,
            data: users
        });

    }catch(err){
        console.log(err);
        res.json({
            status: 500,
            success: false,
            err
        });
    }
});

router.get('/:id', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);

        res.json({
            status: 200,
            success: true,
            data: user
        });
    }catch(err){
        console.log(err);
        res.json({
            status: 500,
            success: false,
            err
        });
    }
});

router.put('/:id', async (req,res)=>{
    try{

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});

        res.json({
            status: 200,
            success: true,
            data: user
        })
    }catch(err){
        console.log(err);
        res.json({
            status: 500,
            success: false,
            err
        });
    }
});

router.delete('/:id', async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);

        res.json({
            status: 200,
            success: true,
            message: "User Deleted"
        });
    }catch(err){
        console.log(err);
        res.json({
            status: 500,
            success: false,
            err
        });
    }
});

module.exports = router;