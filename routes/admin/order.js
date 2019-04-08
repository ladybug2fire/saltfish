var Order = require("../../models/order.js");
var express = require('express')
var router = express.Router()
var fs = require('fs');
var multer = require('multer');


router.get('/', function(req, res){
    Order.find().sort({"_id":-1}).exec(function(err, docs){
        res.render("admin/order/list", {title: '订单管理', layout: 'admin/layout', list: docs });
    })
});

router.get('/list', function(req, res){
    Order.find(function(err, docs){
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
    res.render("admin/order/new", {title: '发布影片', layout: 'admin/layout'})
})

router.get('/delete', function(req, res){
    Order.findByIdAndRemove(req.query.id,function(err, result){
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
    order.findById(req.query.id, function(err, result){
        res.json(result)
    })
});

module.exports = router;