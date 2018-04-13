const express = require('express');
const router = express.Router();
const hoaxCtrl = require('../controllers/hoax.controller');

router.get('/allhoax', hoaxCtrl.getAllHoax)
router.post('/like-dislike', hoaxCtrl.updateHoax)

module.exports = router;
