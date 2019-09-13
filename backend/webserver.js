var path = require("path");
var express = require("express");
var fs = require("fs");

var reFileName = /(?<=\\)[\w\d]*\.js/;
var filename = __filename.match(reFileName)[0];
var siteDirName = '/frontend/';
var reDir = new RegExp("^.*(?=".concat(filename,")"));
var root_path = require('path').resolve(__dirname, '..');
var siteDir = path.join(root_path, siteDirName);

var app = express();
var router = express.Router();
var port = 80;

var log4js = require("log4js");
var logger = log4js.getLogger();
log4js.configure({
    appenders: {
        logfile: { type: 'file', filename: filename + '.log' },
        console: { type: 'console' }
    },
    categories: {
        "default": { appenders: ['logfile', 'console'], level: 'INFO' }
    }
});

app.use(express.static(siteDir));
app.use(log4js.connectLogger(logger, {
    level: 'info',
    format: function (req, res, format) { return format(":remote-addr - \":method :url HTTP/:http-version\" :status :content-length \":referrer\" \":user-agent\""); }
}));

app.get('/', function (req, res) {
    res.sendFile(path.join(siteDir, 'index.html'));
});

var server = app.listen(port, function () { return logger.info(filename + (" is listening on port " + port + "!")); });
logger.info("Server started!");