const Student = require("../models/student");
const Company  = require("../models/company");
const Interview = require('../models/interview');

const fs = require('fs');

// action function to create csv files and responsing with that
module.exports.allStudent = async function (req, res) {
  try {
    // fetching the data from the data base server
    const students = await Student.find({})
    .populate('batch');

      // creating the csv file data here only 
    let serialNumber = 1, entry = "";
    console.log(students.data);
    let fileData = "S.No,Name of Student,Batch,Batch Co-ordinator,College,Placement Status,DSA Score,Web Score,React Score,"
    +"Interview1,Result1,Interview2,Result2,Interview3,Result3"
    for(let student of students){
        entry = serialNumber+","+student.name+","+student.batch.name+","+student.batch.cordinator+","+student.college.replace(",","")
        +","+student.status+","+student.dsa+","+student.web+","+student.react;
        if(student.interviews){
          for(let item of student.interviews){
            entry+=","+item.company+"("+item.date.toString().replace("GMT+0530","").replace("India Standard Time","IST")+"),"+item.result
          }
        }
        serialNumber++;
        fileData+="\n"+entry;
    }
    const file = fs.writeFile('assets/Sudents-Data.csv',fileData,(err,data)=>{
      if(err){
          console.log(err);
          return res.redirect('/');
      }
      return res.download('assets/Sudents-Data.csv');
    });
  } 
  catch (err) {
    console.log("Error******************",err);
  }
};