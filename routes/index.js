var express = require('express');
var router = express.Router();
var request = require('request');
var md5=require('./md5');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post('/ajax', function(req, res, next) {
//    var url=req.body.url;
//    console.log(url)
//    request(url, function (error, response, body) {
//         res.send(body)
//     });
// });
// router.get('/menu', function(req, res, next) {
//     var data=[{title:'首页',url:'/'},{title:'公司简介',url:'/info'},{title:'产品',url:'/pro'}];
//     res.send(JSON.stringify(data))
// });
module.exports = router;
