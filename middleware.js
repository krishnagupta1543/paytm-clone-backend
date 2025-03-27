const jwt = require('jsonwebtoken');
// const {JWT_SECRET} = require('./config');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware = (req, res, next)=>{
    const userAuth = req.headers.authorization;
    if(!userAuth || !userAuth.startsWith('Bearer')){
        res.status(411).json(
            {
                message: "error"
            }
        )
    }else{
        try{
            const token = userAuth.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            req.userId = decoded.userId;
            next();
        }catch(err){
            res.status(411).json({
                msg : err
            })
        }
    }
}
module.exports = {
    authMiddleware
}