const mongoose=require('mongoose');

const batchSchema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        unique:true
    },
    cordinator:{
        type:String,
        required:true,
    }
    
},{
    timestamps:true
});


const Batch = mongoose.model('Batch', batchSchema);
module.exports = Batch;