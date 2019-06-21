const router    = require('express').Router();
const User      = require('../models/User');
const jwt       = require('jsonwebtoken');
const config    = require('../config');
const bcrypt    = require('bcrypt');

router.post('/signup', async (req, res) => {
    try{
        const hashPass = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashPass;
        await User.create(req.body);

        res.json({
            status: 200,
            success: true,
            message: 'User created!'
        });

    }catch(err){
        if(err.name === 'MongoError' && err.code === 11000) {
            res.json({
                status: 500,
                success: false,
                message: 'User already exists!'
            });
        }
    }
});

router.post('/login', async (req, res) => {
    try{
        const { username, password } = req.body;
     
        const user = await User.findOne({'username': username});

        if(user){

            if(bcrypt.compareSync(password, user.password)) {
                
                const payload = {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName
                }

                const token = jwt.sign(payload, config.jwtSecret);

                res.json({
                    status: 200,
                    success: true,
                    token
                });

            }else {
                res.json({
                    status: 401,
                    success: false,
                    message: "invalid credentials"
                });
            }
        }else {
            res.json({
                status: 401,
                success: false,
                message: "Invalid credentials"
            });
        }

    }catch(err){
        console.log(err);
        res.json({
            status: 500,
            success: false,
            err
        });
    }
})

module.exports = router;
