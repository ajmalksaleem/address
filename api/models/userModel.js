import {Schema, model} from 'mongoose'

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : 'user'
    }
}, {timestamps: true})

const User = new model('user', userSchema)

export default User