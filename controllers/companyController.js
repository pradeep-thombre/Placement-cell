const Company=require('../models/company');
module.exports.add= function(req,res){
    return res.render('company');
}

module.exports.create= function(req,res){
    req.flash('success','Company Created Successfully!');
    Company.create(req.body);
    res.redirect('back');
}