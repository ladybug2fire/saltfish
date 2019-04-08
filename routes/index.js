var Good = require("../models/good.js");
var Order = require("../models/order.js");
var User = require("../models/user.js");
var _ = require("lodash");

exports.index = function(req, res) {
  console.log(req.session.username)
  Good.find()
    .sort({ _id: -1 })
    .exec(function(err, docs) {
      if (err) res.send("出错了");
      res.render("index", { title: "首页", list: docs, username: req.session.username || '' });
    });
};

exports.order = function(req, res) {
  res.render("order", { title: "选座", username: req.session.username || '' });
};

exports.getSold = function(req, res){
  Good.findById(req.query.id, function(err, goodUnit) {
     res.json({
       code: 200,
       data: goodUnit.sales
     })
  })
}

exports.orderlist = function(req, res) {
  Order.find().sort({"_id":-1}).exec(function(err, result) {
    res.render("orderlist", { title: "我的订单", list: result, username: req.session.username || '' });
  });
};


