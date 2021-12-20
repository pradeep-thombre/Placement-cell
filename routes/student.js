// import instance of express 
const express = require("express");
const router = express.Router();
const studentController=require('../controllers/studentController')

// call function of task controller depending on requested url
router.get("/add",studentController.add);
router.get("/view",studentController.view);
router.post("/create",studentController.create);
// export router module
module.exports = router;