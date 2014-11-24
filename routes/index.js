var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
//router.get('/', function(req, res) {
//  res.render('index', { title: 'Express' });
//});

router.get('/:id', function(req, res){
	console.log("i am" + req.params.id);
	fs.exists(req.params.id, function(exists) {
	  if (exists) {
	    fs.stat(req.params.id, function(error, stats) {
	      fs.open(req.params.id, "r", function(error, fd) {
	        var buffer = new Buffer(stats.size);
	 
	        fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
	          var data = buffer.toString("utf8", 0, buffer.length);
	 
	          console.log(data);
	          fs.close(fd);
	        });
	      });
	    });
	  }
	});
	res.render('index', {
		title: 'blah',
		age: req.params.id
	})
})

module.exports = router;
