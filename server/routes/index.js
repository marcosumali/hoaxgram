var express = require('express');
const images = require('../middleware/images');
const ModelUpload = require('../models/m_upload');
const ControllerUpload = require('../controllers/c_upload');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET upload page
// router.use('/upload', require('./upload'))
router
  .get('/upload', ControllerUpload.findAll)
  .post('/upload', images.multer.single('image'), images.sendUploadToGCS, ControllerUpload.create)
  .put('/upload/:id', ControllerUpload.update)
  .delete('/upload/:id', ControllerUpload.delete)


module.exports = router;
