var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('../client/detail-post.html', 'utf8');
var options = { 
    format: 'Legal',
    directory: "/tmp",
    orientation: "portrait"
}


module.exports = {
    createPdf: function(req, res, next) {
        pdf.create(html).toStream(function(err, stream){
            stream.pipe(fs.createWriteStream('./hoaxgram.pdf'));
        });
        // pdf.create(html, setting, function(err, buffer){});
        res.redirect('http://127.0.0.1:8080/detail-post.html')
    }
}   