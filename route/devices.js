exports.view = function(req, res, next){
    var session = req.session;
    
    res.render('devices');
}