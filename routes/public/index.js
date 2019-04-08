var Good = require("../../models/good.js");
var Review = require("../../models/review.js");
var express = require('express')
var router = express.Router()
var fs = require('fs');
var multer = require('multer');
var _ = require('lodash')

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

router.get('/detail', function(req, res) {
    Good.findById(req.query.id, function(err, result) {
      if (err) {
        res.send("err", err);
      } else {
        Review.find({goodid: result._id}, function(err, reviews){
            res.render("detail", { title: "详情", item: result, reviews: reviews,username: req.session.username || '' , userid: req.session.userid || ''});
        })
      }
    });
})

router.get('/publish', function(req, res){
    res.render("publish", {title: '发布商品', username: req.session.username || '' });
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

router.post('/publishreview', function(req, res){
    var review = new Review(_.assign(_.pick(req.body,
        ['userid', 'username', 'goodname', 'goodid', 'desc']
    ), {
        addTime: new Date().toLocaleString()
    }))
    review.save(function(err, result){
        if(err){
            res.json({
                code: 500,
                msg: '发布失败'
            })
        }else{
            res.json({
                code: 200,
                msg: '发表成功'
            })
        }
    })
})

router.get('/login', function(req, res){
    res.render('login', {title: '登录', layout: 'base'})
})

router.get('/signup', function(req, res){
    res.render('signup', {title: '注册', layout: 'base'})
})
module.exports = router;