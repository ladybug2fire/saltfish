var path = require('path');
var express = require('express')
var routes = require('./routes/index');
var expressLayouts = require('express-ejs-layouts');

var app = express()

app.set('views', path.join(__dirname, 'views'));
app.set("view engine",'ejs');
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)
app.get('/', routes.index);
app.get('/signup', routes.signup);

app.listen(8080, () => console.log('Example app listening on port 8080!'))
app.use(express.static("static"));