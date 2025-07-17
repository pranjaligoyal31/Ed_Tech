// const express=require('express')
// const router=express.Router()
// const {capturePayment,verifySignature}=require('../controllers/Payments')
// const {auth,isInstructor,isStudent,isAdmin}=require('../middlewares/auth')
// router.post('/capturePayments',auth,isStudent,capturePayment)
// router.post('/verifySignature',verifySignature)
// module.exports=router

const express = require('express');
const router = express.Router();

const { studentEnroll } = require('../controllers/Payments');
const { auth, isStudent } = require('../middlewares/auth');

// 🔹 Dummy Payment Route
router.post('/studentEnroll', auth, isStudent, studentEnroll);
module.exports=router