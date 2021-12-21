const User = require('../models/users');
const Batch = require('../models/batch');
const mailer = require('../mailers/mailerController');

module.exports.signIn= function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('signIn');
}

module.exports.signUp= function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/');
    }

    return res.render('signUp');
}

module.exports.profile =async function(req, res){
    if(! req.isAuthenticated()){
        req.flash('success','User Not Logged-In Redirecting to login ...');
        return res.redirect('/users/signIn');
    }
    try{
        req.flash('success','Redirecting to Profile ...');
        return res.render('profile');
    }
    catch(err){
        console.log("Errr",err);
        return res.redirect('back');
    }
}



// get the sign up data
module.exports.create =async function(req, res){
    if (req.body.password != req.body.confirmpassword){
        req.flash('Password not Matched');
        return res.redirect('back');
    }
    try{
        let user=await User.findOne({email: req.body.email});
        if (!user){
            let user=await User.create(req.body);
            req.flash('User Created successfully!');

            // user = await user.populate('batch', 'name cordinator');
            mailer.userAdd(user);

            return res.redirect('/users/signIn');
        }else{
            req.flash('User Already Exists!');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error in finding user in signing up','Error'+err);
        return res.redirect('back');
    }
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
    
}

module.exports.destroySession = function(req, res){
    
    req.logout();
    req.flash('success','You are Logged out Successfully');
    return res.redirect('/');
}
