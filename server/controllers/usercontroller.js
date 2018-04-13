const User = require('../models/User')
const jwt  = require('jsonwebtoken')

module.exports = {
  signup : (req,res) => {
    User.findOne({email:req.body.email, password:req.body.password}).then(data => {
      if (data) {
        res.status(200).json({
          message: 'username sudah digunakan',
          statuscode:400
        })
      }
      else {
        let user = new User();
        user.username = req.body.username
        user.email = req.body.email
        user.password = req.body.password
        user.save().then(data=>{
          res.status(200).json({
            message: 'signup data succes',
            statuscode:200,
            data
          })
        })
        .catch(err=>{
          res.status(500).json({
            message: 'data tidak ditemukan'
          })
        })
      }
    })
  },
  signin : (req,res) => {
    User.findOne({email:req.body.email, password:req.body.password}).then(data => {
      if (data) {
        let token = jwt.sign({id: data._id,email: data.email},'secretkey')
        res.status(200).json({
          message: "anda berhasil login",
          token
        })
      }
      else {
        res.status(400).json({
          message: "email atau password kagak bener cuy"
        })
      }
    }).catch(err => {
      res.status(400).json({
        messag: "error bung"
      })
    })
  }
}
