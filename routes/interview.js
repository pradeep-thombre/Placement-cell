// import instance of express 
const express = require("express");
const router = express.Router();
const interviewController=require('../controllers/interviewController')

// call function of task controller depending on requested url
router.get("/add",interviewController.add);
router.get("/view",interviewController.view);
router.post("/create",interviewController.create);
// export router module
module.exports = router;