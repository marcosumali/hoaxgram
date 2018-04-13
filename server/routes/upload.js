// var express = require('express');
// const images = require('../middleware/images');
// const ModelUpload = require('../models/m_upload');
// const ControllerUpload = require('../controllers/c_upload');

// var router = express.Router();

// // Other than upload (Read all, update, delete)
// router
//     .get('/', ControllerUpload.findAll)
//     .put('/:id', ControllerUpload.update)
//     .delete('/:id', ControllerUpload.delete)


// //Upload to GCP Storage
// router.post('/',
//     images.multer.single('image'), 
//     images.sendUploadToGCS,
//     (req, res) => {
//     console.log('ini dari js file',req.file);
//     console.log('ini dari js body',req.body);

//     let UploadTitle = req.body.UploadTitle;
//     let UploadDesc = req.body.UploadDesc;
//     let UploadType = req.body.UploadType;
//     let UploadStatus = req.body.UploadStatus;
//     let UploadImage = req.file.cloudStoragePublicUrl;

//     let objUpload = {
//         UploadTitle,
//         UploadDesc,
//         UploadType,
//         UploadStatus,
//         UploadImage
//     }
//     console.log('ini upload',objUpload)   

//     const newUpload = new ModelUpload(objUpload);

//     newUpload.save(function(err, result) {
//         if (err) {
//             res.status(400).json({
//                 message: "Bad Request",
//             })

//         } else {
//             res.status(200).json({
//                 message: "Add upload success",
//                 upload: result
//             })
//         }
//     })

//     // res.send({
//     //   status: 200,
//     //   message: 'Your file is successfully uploaded',
//     //   link: req.file.cloudStoragePublicUrl
//     // })
// })


// module.exports = router;