var express = require('express');
var router = express.Router();
var multer=require('multer');
var path=require('path');
var xlsx=require('node-xlsx');
var mysql=require('./mysql');
var md5=require('./md5');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        var str="application/vnd.ms-excel,application/x-xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        if(str.indexOf(file.mimetype)>-1){
            cb(null, new Date().getTime()+file.originalname)
        }else{
            return false;
        }

    }
})

var upload = multer({ storage: storage })
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/checkLogin', function(req, res, next) {
 var uname=req.body.user;
 var upass=md5(req.body.pass);
 mysql.query(`select uid,uname from user where uname='${uname}' and upass='${upass}'`,function (err,result) {
      var obj={};
     if(err) throw err;
     if(result.length>0){
         result.message='success';
         obj.message='success';
         for(var i in result[0]){
           obj[i]=result[0][i];
         }
         res.send(JSON.stringify(obj))
     }else{
        obj.message='error';
        res.send(JSON.stringify(obj));
     }
 })
});
router.post('/upload',upload.single('files'),function (req,res,next) {
    var url=path.resolve(__dirname,'..',req.file.path);
    var info=xlsx.parse(url)[0].data;
    info=info.filter(function (a) {
        return a.length>0
    })
    var arr=[];
    for(var i=1;i<info.length;i++){
        info[i].push(md5('123456'))
        arr.push(info[i])
    }
    mysql.query("replace into member(mnum,mname,mphone,mpass) values ?",[arr],function (err,result) {
        if(err) throw err;
        if(result.affectedRows>0){
            var arrs=[];
            for(var i=0;i<arr.length;i++){
                var obj={};
                obj.mnum=arr[i][0];
                obj.mname=arr[i][1];
                obj.mphone=arr[i][2];
                arrs.push(obj);
            }
            res.send(JSON.stringify(arrs));
        }else{
            res.send();
        }
    } )
})
module.exports = router;
