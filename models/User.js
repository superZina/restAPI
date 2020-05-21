const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const userSchema = new Schema({
    email : {
        type:String,
        required: true,
    },
    name:String,
    age:{
        type:Number,
        min: 18,
        max: 50
    },
    phone:{
        type:Number,
        default: 111111111
    }
});


module.exports = mongoose.model('User', userSchema);