const { Router } = require('express');
const { userSchema } = require('../schemas/userSchema');
const { User } = require('../db/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = Router();

require('dotenv').config();

router.post('/signup', async (req, res) => {
    const userData = req.body;
    const schemaCheck = userSchema.safeParse(userData);
    if(schemaCheck.success){
        const isExist = await User.findOne({email: userData.email});
        if(!isExist){
            const hash = await bcrypt.hash(userData.password, 10);
            userData.password = hash;
            await User.create(userData);
            const token = jwt.sign({email: userData.email}, process.env.JWT_SECRET);
            res.status(200).json({
                msg: "User created successfully",
                token: token
            });
        }
        else{
            res.status(400).json({
                msg: "User already exist"
            });
        }
    }
    else{
        res.status(400).json({
            msg: "Invalid inputs",
            err: schemaCheck.error
        });
    }
});

router.post('/signin', async (req, res) => {
    const userData = req.body;
    const schemaCheck = userSchema.safeParse(userData);
    if(schemaCheck.success){
        const isExist = await User.findOne({email: userData.email});
        if(isExist){
            const match = await bcrypt.compare(userData.password, isExist.password);
            if(match){
                const token = jwt.sign({email: userData.email}, process.env.JWT_SECRET);
                res.status(200).json({
                    msg: "User logged in successfully",
                    token: token
                });
            }
            else{
                res.status(400).json({
                    msg: "Incorrect password"
                });
            }
        }
        else{
            res.status(400).json({
                msg: "User not found"
            });
        }
    }
    else{
        res.status(400).json({
            msg: "Invalid inputs",
            err: schemaCheck.error
        });
    }
});

router.get('/', (req, res) => {
    try{
        const auth = req.headers.authorization;
        const token = auth.split(' ');
        const decoded = jwt.verify(token[1], process.env.JWT_SECRET);
        if(decoded.email){
            res.status(200).json({
                msg: "User verified successfully"
            });
        }
    }
    catch(error){
        res.status(400).json({
            msg: "User not authenticated",
            err: error
        });
    }
});

module.exports = { router };
