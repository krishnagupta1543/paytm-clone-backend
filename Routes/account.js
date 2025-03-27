const express = require('express');
const mongoose = require('mongoose');
const { ACCOUNT } = require('../db');
const { authMiddleware } = require('../middleware');
const zod = require('zod');
const accountRouter = express.Router();

accountRouter.get('/balance',authMiddleware,async(req, res)=>{
    const userId = req.userId;
    const userData = await ACCOUNT.findOne({
        userId:userId
    })
    res.json({
        balance: userData.balance
    })
})
// {
//     to:String,
//     amount:Number
// }

const amountSchema = zod.object({
    to: zod.string(),
    amount: zod.number()
})

accountRouter.post('/transfer', authMiddleware, async (req, res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();

    try{
        const payload = req.body;

        const parsed = amountSchema.safeParse(payload);

        if(!parsed.success){
            return res.status(400).json({
                message: "invalid entry"
            })
        }

        const {to, amount} = payload;
        const account = await ACCOUNT.findOne({userId: req.userId}).session(session);

        if(!account || account.balance < amount){
            await session.abortTransaction();
            return res.status(400).json({
                message: "insufficient balance"
            });
        }
        const toAccount = await ACCOUNT.findOne({userId: to}).session(session);

        if(!toAccount){
            await session.abortTransaction();
            return res.status(400).json({message: "Invalid account"})
        }
        await ACCOUNT.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session);

        await ACCOUNT.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);

        await session.commitTransaction();

        res.json({
            message: "Transfer successful"
        })
    }catch(error){
        await session.abortTransaction();
        {console.log("abortTransaction ", error)}
        res.status(500).json({
            message: "Transaction Failed",
            error: error
        })
    }finally{
        session.endSession()
    }
}
)

module.exports = {
    accountRouter
}