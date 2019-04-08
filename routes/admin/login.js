exports.login = function(req, res){
    res.render("admin/login", {title: '登入', layout: false });
}

exports.register = function(req, res){
    res.render("admin/register", {title: '登入', layout: false });
}
