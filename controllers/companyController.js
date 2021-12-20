const Company=require('../models/company');
module.exports.add= function(req,res){
    return res.render('addcompany');
}

module.exports.create= function(req,res){
    req.flash('success','Company Created Successfully!');
    Company.create(req.body);
    res.redirect('/company/view');
}



module.exports.view=async function(req,res){
    try{
        let companies= await Company.find({});
        return res.render('viewcompany',{
            companies:companies
        });
    }catch(err){
        req.flash('error','Some Error Occured');
    }
}