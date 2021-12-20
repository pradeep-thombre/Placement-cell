const Batch= require('../models/batch');

module.exports.add= function(req,res){
    return res.render('batch');
}

module.exports.create= function(req,res){
    req.flash('success','Batch Created Successfully!');
    Batch.create(req.body);
    res.redirect('back');
}