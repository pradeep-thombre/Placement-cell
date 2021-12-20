const Interview=require('../models/company');
const Company=require('../models/company');
module.exports.add=async function(req,res){
    try{
        let company= await Company.find({});
        return res.render('interview',{
            company:company,
            student:company
        });
    }catch(err){
        req.flash('error','Some Error Occured');
    }
}

module.exports.create= function(req,res){
    req.flash('success','Interview scheduled Successfully!');
    Interview.create(req.body);
    res.redirect('back');
}