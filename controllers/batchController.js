const Batch= require('../models/batch');

module.exports.add= function(req,res){
    return res.render('addbatch');
}

module.exports.create= function(req,res){
    req.flash('success','Batch Created Successfully!');
    Batch.create(req.body);
    res.redirect('/batch/view');
}


module.exports.view=async function(req,res){
    try{
        let batches= await Batch.find({});
        return res.render('viewbatch',{
            batches:batches
        });
    }catch(err){
        req.flash('error','Some Error Occured');
    }
}