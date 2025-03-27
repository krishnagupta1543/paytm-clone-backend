const express = require('express');
const { USERS } = require('../db');
const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = require('../config');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET
const bulkRouter = express.Router();

bulkRouter.get('/', async(req, res)=>{
    const filter = req.query.filter ;
    const token = req.query.token;
    const decode = jwt.verify(token, JWT_SECRET);
    const users = await USERS.find({
        _id: { $ne: decode.userId },
        $or:[
            {
                firstName:{
                    $regex: filter
                }
            },{
                lastName:{
                    $regex: filter
                }
            }
        ]
    })
    res.json({
        user: users.map(user=>(
            {
                username: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }
        ))
    })
})
module.exports = {
    bulkRouter
}