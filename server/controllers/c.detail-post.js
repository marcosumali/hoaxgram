var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('../client/pdf.html', 'utf8');
var options = { 
    format: 'Legal',
    directory: "/tmp",
    orientation: "portrait"
}


module.exports = {
    createPdf: function(req, res, next) {
        pdf.create(html).toStream(function(err, stream){
            stream.pipe(fs.createWriteStream('./hoaxgram-new.pdf'));
        })
        res.status(200).json({
            message: 'sukses print pdf' 
        })
    }
}   