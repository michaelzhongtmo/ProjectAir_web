
exports.view = function(req, res, next){
    res.render('index');
}

exports.login = function(req, res, next){

}

exports.register = function(req, res, next){
    res.render('loading');
    var admin = require("firebase-admin");
    console.log(req.body.reg_email);
    admin.auth().getUserByEmail(req.body.reg_email)
        .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully fetched user data:", userRecord.toJSON());
    })
        .catch(function(error) {
        console.log("Error fetching user data:", error);
    });
}