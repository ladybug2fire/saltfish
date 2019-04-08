var Good = require("../../models/good.js");
var express = require('express')
var router = express.Router()
var fs = require('fs');
var multer = require('multer');

var upload = multer({ dest: 'uploads/img/'});

router.post("/upload", upload.single('file'), function(req, res, next){
    let obj = req.file;
    let good = new Good({
        goodname : req.body.goodname,
        addTime: new Date().toLocaleString(),
        picUrl: '/img/' + obj.filename,
        goodyear: req.body.goodyear,
        star: req.body.star || 0,
        desc: req.body.desc,
        price: req.body.price,
    });
    good.save(function (err, result) {
        if (err) {
            console.log("Error:" + err);
            res.json({
                code: 500,
                msg: err,
            })
        }
        else {
            res.json({
                code: 200,
                msg: '发布成功'
            }) 
        }
     });
});


router.get('/', function(req, res){
    Good.find().sort({"_id":-1}).exec(function(err, docs){
        res.render("admin/good/list", {title: '商品', layout: 'admin/layout', list: docs });
    })
});

router.get('/list', function(req, res){
    Good.find(function(err, docs){
        if(err){
            res.json({
                code: 500,
                msg: err
            })
        }else{
            res.json({
                code: 200,
                data: docs,
            })
        }
    })
})

router.get('/new', function(req, res){
    res.render("admin/good/new", {title: '发布商品', layout: 'admin/layout'})
})

router.get('/delete', function(req, res){
    Good.findByIdAndRemove(req.query.id,function(err, result){
        if(err){
            res.json({
                code: 500,
                msg: err,
            })
        }else{
            res.json({
                code: 200,
                msg: '删除成功'
            })
        }
    })
});

router.get('/get', function(req, res){
    good.findById(req.query.id, function(err, result){
        res.json(result)
    })
});

router.get('/dashboard', function(req, res){
    res.render("admin/chart", {title: '商品账目表', layout: 'admin/layout'});
})

module.exports = router;