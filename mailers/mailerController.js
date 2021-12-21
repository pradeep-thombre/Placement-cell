const nodemailer=require('../config/nodemailer');

exports.userAdd=(user)=>{
    let htmlString=nodemailer.renderTemplate({user:user},'/userAdd.ejs');
    nodemailer.transporter.sendMail({
        from:'learningdemo068@gmail.com',
        to:user.email,
        subject:"Placement Cell- Account created Successfully!",
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('error in sending mail',err);
            return;
        }
        console.log('Message sent',info);
        return;
    });
}

exports.studentAdd=(user)=>{
    let htmlString=nodemailer.renderTemplate({user:user},'/studentAdd.ejs');
    nodemailer.transporter.sendMail({
        from:'learningdemo068@gmail.com',
        to:user.email,
        subject:"Placement Cell- Profile created Successfully!",
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('error in sending mail',err);
            return;
        }
        console.log('Message sent',info);
        return;
    });
}


exports.interviewAdd=(interview,company)=>{
    let htmlString=nodemailer.renderTemplate({interview:interview,company:company},'/interviewAdd.ejs');
    nodemailer.transporter.sendMail({
        from:'learningdemo068@gmail.com',
        to:interview.student.email,
        subject:"Invitation for Online Interview with "+company+" for the position of "+interview.role,
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('error in sending mail',err);
            return;
        }
        console.log('Message sent',info);
        return;
    });
}

