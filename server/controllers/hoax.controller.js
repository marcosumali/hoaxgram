const Hoax = require('../models/hoax.model');

module.exports = {
    getAllHoax: function(req, res){
        Hoax.find({})
        .then(data =>{
            if(data){
                res.status(200).json({
                    message: 'get all hoax successful',
                    data: data
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'server have a problem',
                error: err
            })
        })
    },

    updateHoax: function(req, res){
        let updated_id = req.body._id;

        let updated_hoax = {
            UploadDislike: req.body.UploadDislike,
            UploadLike: req.body.UploadLike,
        };
        Hoax.findByIdAndUpdate(updated_id,updated_hoax)
        .then(data=>{
            res.status(200).json({
                message: 'berhasil menambahkan like/dislike'
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                message: 'server have a problem',
                error: err
            })
        })
        
    }
}