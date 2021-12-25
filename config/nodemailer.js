// importing libraries 
const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');


// creating transport engine 
let transporter=nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:{
        user:'learningdemo068',
        pass:'Demo@123'
    }
});


// rendering mailer 
let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log("'error in rendering template",err); return;}
            mailHTML=template;
        }
    )
    return mailHTML;
}

// exporting module 
module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}