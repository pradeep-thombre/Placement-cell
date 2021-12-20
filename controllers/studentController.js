const Student= require('../models/student');
const Batch=require('../models/batch');
module.exports.add=async function(req,res){
    try{
        let batches= await Batch.find({});
        return res.render('addstudent',{
            batches:batches
        });
    }catch(err){
        req.flash('error','Some Error Occured');
    }
}

module.exports.create= function(req,res){
    req.flash('success','Student Created Successfully!');
    Student.create(req.body);
    res.redirect('/student/view');
}

module.exports.view=async function(req,res){
    try{
        let students= await Student.find({});
        return res.render('viewstudent',{
            students:students
        });
    }catch(err){
        req.flash('error','Some Error Occured');
    }
}