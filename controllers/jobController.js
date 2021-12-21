const Job= require('../models/job');

module.exports.add=async function(req,res){
    try{
        return res.render('addjob');
    }catch(err){
        req.flash('error','Some Error Occured');
    }
}

module.exports.create=async function(req,res){
    try{
        req.flash('success','Job Created Successfully!');
        let job = await Job.create(req.body);
        res.redirect('/job/view');
    }
    catch(err){
        console.log(err);
    }
}

module.exports.view=async function(req,res){
    try{
        let jobs= await Job.find({});
        return res.render('viewjob',{
            jobs:jobs
        });
    }catch(err){
        req.flash('error','Some Error Occured');
    }
}

