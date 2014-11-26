var express = require('express');
var router = express.Router();
var config = require('./config');
var fs = require('fs');
var crypto = require('crypto');

var md5sum = crypto.createHash(config.transform);

router.get('/', function(req, res){

	fs.exists(req.query.file, function(exists) {
	  if (exists) {
	    var rstream = fs.createReadStream(req.query.file);
		var wstream = fs.createWriteStream(config.basedir + 'hashed.txt');

		rstream.on('data', function(d) {
	  		md5sum.update(d);
		});

		rstream.on('end', function() {
	  		var d = md5sum.digest('hex');
	  		console.log(d);
	  		res.send('file: ' + d)
		});

		rstream.pipe(wstream)  // writes to myfile.encrypted

	  }
	  else {
	  	res.send('cannot find file')
	  }
	});
})


module.exports = router;
