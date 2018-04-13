var express = require('express');
var router = express.Router();
const controller = require('../controllers/c.detail-post')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    message: 'masuk ke index details'
  });
});


router.get('/createpdf', controller.createPdf)

module.exports = router;
