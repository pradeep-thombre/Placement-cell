module.exports.profile=  function(req,res){
    return res.render('profile');
}

module.exports.signIn= function(req,res){
    return res.render('signIn');
}

module.exports.signUp= function(req,res){
    return res.render('signUp');
}

// get the sign up data
module.exports.create =async function(req, res){
    if (req.body.password != req.body.confirmpassword){
        return res.redirect('back');
    }
    try{
        let user=await User.findOne({email: req.body.email});
        if (!user){
            User.create(req.body);
            // req.flash('User Created successfully!');
            return res.redirect('/users/signIn');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        // req.flash('error in finding user in signing up','Error'+err);
        return res.redirect('back');
    }
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    // req.flash('success','Logged in Successfully');
    return res.redirect('/users/home');
    
}

module.exports.destroySession = function(req, res){
    
    req.logout();
    // req.flash('success','You are Logged out Successfully');
    return res.redirect('/users/signIn');
}
