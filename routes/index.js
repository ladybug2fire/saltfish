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

exports.doLogin = function(req, res) {
  User.findOne({username: req.body.username},function(err, result){
    console.log(result)
    if(result && result.userpwd == req.body.password){
      req.session.username = req.body.username;
      req.session.userid = result._id;
      res.redirect('/');
    }else{
      res.render('error', {error:'账号或密码错误', title: '发生错误', username: ''})
    }
  })
};

exports.signup =  function(req, res){
  User.find({ username: req.body.username}, function(err, result){
      if(result.length){
          res.render('error', {error:'用户名已经被占用', title: '发生错误', username: ''})
      }else{
          console.log(req.body)
          var user = new User({
              username : req.body.username,
              userpwd: req.body.password,
              phone: req.body.phone,
          });
          user.save(function (err, result) {
              if (err) {
                  console.log("Error:" + err);
                  res.json({
                      code: 500,
                      msg: err,
                  })
              }
              else {
                res.redirect('/');
              }
          });
      }
  })
}

exports.order = function(req, res) {
  res.render("order", { title: "选座", username: req.session.username || '' });
};

exports.detail = function(req, res) {
  Good.findById(req.query.id, function(err, result) {
    if (err) {
      res.send("err", err);
    } else {
      res.render("detail", { title: "详情", good: result, username: req.session.username || '' });
    }
  });
};

exports.getSold = function(req, res){
  Good.findById(req.query.id, function(err, goodUnit) {
     res.json({
       code: 200,
       data: goodUnit.sales
     })
  })
}

exports.buy = function(req, res) {
  let seats = req.body["seats[]"];
  if(!_.isArray(seats)){
    seats = [seats];
  }
  if(seats.length=== 0)res.json({
    code:500,
    msg: '没有选座位'
  })
  Good.findById(req.body.id, function(err, goodUnit) {
    if (_.isEmpty(_.intersection(goodUnit.sales, seats))) {
      Good.findByIdAndUpdate(
        req.body.id,
        { $addToSet: { sales: { $each: seats } } },
        function(err, result) {
          if (err) {
            res.send("err, good", err);
          } else {
            let order = new Order({
              goodid: result._id,
              goodname: result.goodname,
              seats: seats,
              price: _.get(result, 'price', 0) * seats.length,
              userid: 1234,
              username: "",
              addTime: new Date().toLocaleString()
            });
            order.save(function(err, result2) {
              if (err) {
                res.json({
                  code: 500
                });
              } else {
                res.json({
                  code: 200,
                  msg: "下单成功"
                });
              }
            });
          }
        }
      );
    } else {
      res.json({
        code: 500,
        msg: "无效订单"
      });
    }
  });
};

exports.orderlist = function(req, res) {
  Order.find().sort({"_id":-1}).exec(function(err, result) {
    res.render("orderlist", { title: "我的订单", list: result, username: req.session.username || '' });
  });
};

exports.goodlist = function(req, res) {
  Good.find(function(err, result) {
    res.render("goodlist", { title: "商品列表", list: result, username: req.session.username || ''  });
  });
};

exports.search = function(req, res) {
  Good.find({goodname: req.body.goodname},function(err, result) {
    res.render("goodlist", { title: "商品列表", list: result || [], username: req.session.username || ''  });
  });
};

