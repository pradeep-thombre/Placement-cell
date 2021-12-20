const Interview=require('../models/interview');
const Company=require('../models/company');
const Student=require('../models/student');
module.exports.add=async function(req,res){
    try{
        let company= await Company.find({});
        let student= await Student.find({});
        return res.render('addinterview',{
            company:company,
            student:student
        });
    }catch(err){
        req.flash('error','Some Error Occured');
    }
}

module.exports.create= function(req,res){
    req.flash('success','Interview scheduled Successfully!');
    Interview.create(req.body);
    console.log(req.body);
    res.redirect('/interview/view');
}


module.exports.view=async function(req,res){
    try{
        let interviews= await Interview.find({});
        return res.render('viewinterview',{
            interviews:interviews
        });
    }catch(err){
        req.flash('error','Some Error Occured');
    }
}