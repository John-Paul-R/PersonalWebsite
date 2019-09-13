var path = require("path");
var express = require("express");

var reFileName = /(?<=\\)[\w\d]*\.js/;
var filename = __filename.match(reFileName)[0];

var app = express();
var router = express.Router();
var port = 80;
