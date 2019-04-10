exports.index = function(req, res){
    if(req.session.admin){
        res.redirect('/admin/order');
    }else{
        res.redirect('/admin/login');
    }
}