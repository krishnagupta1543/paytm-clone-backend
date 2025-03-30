const express = require('express');
const zod = require('zod');
const jwt = require("jsonwebtoken");
const { USERS, ACCOUNT } = require('../db');
// const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');
const {bulkRouter} = require('./bulk')

const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET
const signupPayload = zod.object({
    userName: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

const userRouter = express.Router();

userRouter.use('/bulk', bulkRouter)

userRouter.post('/signup', async(req, res)=>{
    const userPayload = req.body;
    const parsed = signupPayload.safeParse(userPayload);
    if(!parsed.success){
        return res.status(400).send(parsed.error.errors);
    }

    const existingUser = await USERS.findOne({
        userName: userPayload.userName
    })

    if(existingUser){
        return res.status(409).json({
            message: "userNameEmail already exist"
        })
    }
    const user = await USERS.create({
        userName:userPayload.userName,
        password:userPayload.password,
        firstName:userPayload.firstName,
        lastName:userPayload.lastName
    })

    const userId = user._id;

    const token = jwt.sign({
        userId: userId
    }, JWT_SECRET);
    
    await ACCOUNT.create({
        userId: userId,
        balance:1+Math.random()*20000
    })


    res.json({
        message: "User created successfully",
        token: token
    })
    }
)

const signinPayload = zod.object({
    userName: zod.string().email(),
    password: zod.string()
})

userRouter.post('/signin', async (req, res)=>{
    const userpayload = req.body;
    const parsed = signinPayload.safeParse(userpayload);

    if(!parsed.success){
        return res.status(400).json(
            {
                message: "invalid data"
            }
        )
    }
    const {userName, password} = userpayload;

    const existingUser = await USERS.findOne({userName: userName, password: password});

    if(!existingUser){
        return res.status(400).json({
            message: "Wrong username or password"
        });
    }

    const token = jwt.sign({userId: existingUser._id}, JWT_SECRET);

    res.status(200).json({
        messeage: "user signin successfully",
        token: token
    }
    )
})

// client can optionaly edit their information
const updateUserPayload = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional()
})
userRouter.put('/put',authMiddleware, async(req, res)=>{
    const updateBodypayload = req.body;
    const parsed = updateUserPayload.safeParse(updateBodypayload);
    if(!parsed.success){
        res.status(400).json({
            msg : "invalid inputs"
        })
    }
    await USERS.updateOne({
        _id:req.userId 
    }, updateBodypayload)
    res.json({
        msg: "Updated successfully"
    })
})

module.exports = {
    userRouter
}