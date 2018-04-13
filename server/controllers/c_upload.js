const ModelUpload = require('../models/m_upload');
const ObjectId = require('mongodb').ObjectID;

class ControllerUpload {

    static create(req,res) {
        //console.log('ini dari js file',req.file);
        //console.log('ini dari js body',req.body);
    
        let UploadTitle = req.body.UploadTitle;
        let UploadDesc = req.body.UploadDesc;
        let UploadType = req.body.UploadType;
        let UploadStatus = req.body.UploadStatus;
        let UploadImage = req.file.cloudStoragePublicUrl;
    
        let objUpload = {
            UploadTitle,
            UploadDesc,
            UploadType,
            UploadStatus,
            UploadImage,
            UploadLike : 0,
            UploadDislike : 0
        }
        //console.log('ini upload',objUpload)   
    
        const newUpload = new ModelUpload(objUpload);
    
        newUpload.save(function(err, result) {
            if (err) {
                res.status(400).json({
                    message: "Bad Request",
                })
    
            } else {
                res.status(200).json({
                    message: "Add upload success",
                    upload: result
                })
            }
        })
    
        // res.send({
        //   status: 200,
        //   message: 'Your file is successfully uploaded',
        //   link: req.file.cloudStoragePublicUrl
        // })
    }


    static findAll(req,res) {
        ModelUpload.find(function(err,result) {
            if (err) {
                res.status(400).json({
                    message: "Bad Request",
                })
            } else {
                res.status(200).json({
                    message: "Show all upload success",
                    uploads: result
                })
            }
        })
    }

    static update(req,res) {
        let id = req.params.id;
        // console.log('masuk update', id)
        // console.log('masuk update', req.body)

        let UploadTitle = req.body.UploadTitle;
        let UploadDesc = req.body.UploadDesc;
        let UploadType = req.body.UploadType;
        let UploadStatus = req.body.UploadStatus;
        // let UploadImage = req.file.cloudStorageObject;
    
        let objUpload = {
            UploadTitle,
            UploadDesc,
            UploadType,
            UploadStatus,
            // UploadImage
        }
        
        ModelUpload.findOneAndUpdate({_id: ObjectId(id)}, {$set: objUpload}, function(err,result) {
            if (err) {
                res.status(400).json({
                    message: "Bad Request",
                })
            } else {
                res.status(200).json({
                    message: "Upadate upload success (below are before)",
                    upload: result
                })
            }
        })
        
    }


    static delete(req,res) {
        let id = req.params.id;

        ModelUpload.deleteOne({_id: ObjectId(id)}, function(err,result) {
            if (err) {
                res.status(400).json({
                    message: "Bad Request",
                })
            } else {
                res.status(200).json({
                    message: "Delete upload success",
                    upload: result
                })
            }
        })
    }



}


module.exports = ControllerUpload;