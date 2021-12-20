const mongoose=require('mongoose');

const interviewSchema=new mongoose.Schema({
    
    role:{
        type:String,
        required:true,
    },
    student:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    }
    
},{
    timestamps:true
});


const Interview = mongoose.model('Interview', interviewSchema);
module.exports = Interview;