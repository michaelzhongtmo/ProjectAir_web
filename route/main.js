exports.view = function(req, res, next){
    console.log("\nCurrently in route/main.js");

    var session = req.session;
    var admin = require('firebase-admin');
    var name;
    admin.auth().getUser(session.uid)
        .then(function(userRecord) {
        console.log("Successfully fetched user data:", userRecord.toJSON());
        res.render('main', {userName: userRecord.displayName, userEmail: userRecord.email});
    })
        .catch(function(error) {
        console.log("Error fetching user data:", error);
        session.error = error;
        res.redirect('/');
    });

}

exports.logout = function (req, res, next){
    var session = req.session;
    session.tag = 'logout';
    console.log("Currently in main.js. Logging out");
    res.end();
}