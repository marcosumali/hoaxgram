let mongoose = require('mongoose');

let hoaxSchema = mongoose.Schema({
    uploadTitle: String,
    UploadDesc: String,
    UploadType: String,
    UploadStatus: String,
    UploadImage: String,
    UploadDislike: Number,
    UploadLike: Number
},{
  timestamps: true  
});

var Hoax = mongoose.model('Hoax', hoaxSchema);

module.exports = Hoax;