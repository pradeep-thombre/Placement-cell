const Interview=require('../models/interview');
const Company=require('../models/company');
const Student=require('../models/student');
const mailer = require('../mailers/mailerController');
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

module.exports.create=async function(req,res){
    req.flash('success','Interview scheduled Successfully!');
    let interview =await Interview.create(req.body);
    let company= await Company.findById(req.body.company);
    interview = await interview.populate({ path: 'student',select: 'name email',});
    mailer.interviewAdd(interview,company.name);
    res.redirect('/interview/view');
}


module.exports.view=async function(req,res){
    try{
        let interviews= await Interview.find({}).sort('date').populate('company').populate('student');
        let company=await Company.find({});
        let student= await Student.find({});
        return res.render('viewinterview',{
            interviews:interviews,
            company:company,
            student:student
        });
    }catch(err){
        req.flash('error','Some Error Occured');
    }
}

module.exports.update=async function(req,res){
    try{
    let interview= await Interview.findById(req.body.id);
    interview.result=req.body.result;
    interview.save();
    return res.redirect('back');
    }catch(err){
        console.log(err);
    }
}