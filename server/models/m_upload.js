// MODEL UPLOAD
var mongoose = require('mongoose');

let uploadSchema = mongoose.Schema({
    UploadTitle: String,
    UploadDesc: String,
    UploadType: String,
    UploadStatus: String,
    UploadImage: String,
    UploadDislike: Number,
    UploadLike: Number
});

let Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;