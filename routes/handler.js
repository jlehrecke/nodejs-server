var express = require('express');
var router = express.Router();
var config = require('./config');
var fs = require('fs');
var crypto = require('crypto');

var md5sum = crypto.createHash('md5');

router.get('/', function(req, res){

	fs.exists(req.query.file, function(exists) {
	  if (exists) {
	    var rstream = fs.createReadStream(req.query.file);
		var wstream = fs.createWriteStream('file.hashed');

		rstream.on('data', function(d) {
	  		md5sum.update(d);
		});

		rstream.on('end', function() {
	  		var d = md5sum.digest('hex');
	  		console.log(d);
	  		res.send('file: ' + d)
		});

		rstream.pipe(wstream)  // writes to myfile.encrypted
		rstream.on('finish', function () {  // finished
			    console.log('done encrypting');
		});


	  }
	  else {
	  	res.send('cannot find file')
	  }
	});
})

console.log(config.transform);

module.exports = router;
