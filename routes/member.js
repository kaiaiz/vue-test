var express = require('express');
var router = express.Router();
var mysql=require('./mysql');
var md5=require('./md5');
/* GET users listing. */
router.get('/select', function(req, res, next) {
    mysql.query("select * from member",function (err,result) {
        var obj=[];
        if(err) throw err;
        if(result.length>0){
            res.send(JSON.stringify(result));
        }else{
            res.send(JSON.stringify(obj));
        }
    })
});
router.post('/add', function(req, res, next) {
    var mnum=req.body.mnum;
    var mname=req.body.mname;
    var mphone=req.body.mphone;
    var mpass=md5('123456');
    mysql.query(`replace into member(mnum,mname,mphone,mpass) values('${mnum}','${mname}','${mphone}','${mpass}')`,function (err,result) {
        if(err) throw err;
        if(result.affectedRows>0){
            res.send('ok');
        }else{
            res.send('error')
        }
    })
});
router.post('/update', function(req, res, next) {
    var mnum=req.body.mnum;
    var mname=req.body.mname;
    var mphone=req.body.mphone;
    var mid=req.body.mid;
    mysql.query(`update member set mnum='${mnum}',mname='${mname}',mphone='${mphone}' where mid=${mid}`,function (err,result) {
        if(err) throw err;
        if(result.affectedRows>0){
            res.send('ok');
        }else{
            res.send('error')
        }
    })
});
router.get('/del', function(req, res, next) {
    var mid=req.query.mid;
    console.log(mid)
    mysql.query(`delete from member where mid=${mid}`,function (err,result) {
        if(err) throw err;
        if(result.affectedRows>0){
            res.send('ok');
        }else{
            res.send('error')
        }
    })
});
module.exports = router;
