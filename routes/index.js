const express=require('express');
const router=express.Router();
const homeController= require('../controllers/homeController');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/company',require('./company'));
router.use('/batch',require('./batch'));
router.use('/interview',require('./interview'));
router.use('/student',require('./student'));
module.exports = router;