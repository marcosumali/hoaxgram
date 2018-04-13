const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller')

/* GET users listing. */
router.post('/signup',usercontroller.signup)
router.post('/signin',usercontroller.signin)
module.exports = router;
