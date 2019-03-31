exports.index = function (req, res) {
    res.render("index", { title: '首页' });
}

// var MongoClient = require('mongodb').MongoClient

// MongoClient.connect('mongodb://localhost:27017/animals', function (err, client) {
//   if (err) throw err

//   var db = client.db('animals')
  
//   db.collection('mammals').find().toArray(function (err, result) {
//     if (err) throw err

//     console.log(result)
//   })
// })

exports.signup = function(req, res){
    res.render("signup", {title: '注册', layout: 'base' });
}

exports.login = function(req, res){
    res.render("login", {title: '登入', layout: 'base' });
}