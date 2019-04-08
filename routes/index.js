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


