const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config();

const MONGO_URL = process.env.MONGOOSE_URL;

mongoose.connect(MONGO_URL);

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            require: true, 
            unique:true,
            trim:true,
            lowercase:true,
        },
        password:{
            type:String,
            required:true,
            minLength:6,
            maxLength:20,
        },
        firstName: {
            type: String,
            required:true,
            minLength:3,
            maxLength:20,
            trim:true,
        },
        lastName: {
            type:String,
            required:true,
            maxLength:50,
            trim:true
        },
    }
)
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USERS',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const USERS = mongoose.model('user', userSchema);
const ACCOUNT = mongoose.model('Account', accountSchema);
module.exports = {
    USERS,
    ACCOUNT
}