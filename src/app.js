var express = require('express');
var exec = require('shelljs').exec;
var logger = require('morgan');
var config = require('../etc/config');
var debug = require('debug')('handler');

var app = express();

app.use(logger('dev'));

app.get('*', function(req, res, next) {
    var file = config.basedir + req.path;
    var cmd = config.transform;
    var process = [cmd, file].join(' ');

    debug('executing process: ' + process);

    var output = exec(process, {silent:true}).output;
    res.type(config.content_type);
    res.status(200).send(output);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
