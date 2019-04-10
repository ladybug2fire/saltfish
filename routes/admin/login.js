exports.login = function(req, res){
    res.render("admin/login", {title: '登入', layout: false });
}

exports.dologin = function(req, res){
    if(req.body.username =='admin' && req.body.password === 'admin'){
        req.session.admin = true
        res.redirect('/admin')
    }else{
        res.render('admin/error', {title: '错误', error: '账号或密码不对', layout: false})
    }
}

exports.adminlogout = function(req, res){
        req.session.admin = false
        res.redirect('/admin')
}

exports.register = function(req, res){
    res.render("admin/register", {title: '登入', layout: false });
}
