exports.view = function(req, res, next){
    console.log("\nCurrently in route/main.js");

    var session = req.session;
    var admin = require('firebase-admin');
    var db = admin.database();
    var padRef = db.ref("users/" + session.uid + "/pad");

    admin.auth().getUser(session.uid)
        .then(function(userRecord) {
        session.name = userRecord.displayName;
        session.email = userRecord.email;

        console.log("Successfully fetched user data:", userRecord.toJSON());

    })
        .catch(function(error) {
        console.log("Error fetching user data:", error);
        session.error = error;
        res.redirect('/');
    });

    padRef.once('value').then(function(snapshot){
        pads = snapshot.val();
        session.padArray = pads.split(',');
    }).catch(function(error){
        console.log("Cannot access user's pad data", error);
        session.error = error;
        res.render('/');
    });

    console.log("User owns pad: " + session.padArray);
    // Rendering main page
    res.render('main', {userName: session.name, userEmail: session.email, padArray: session.padArray});
}

exports.logout = function (req, res, next){
    var session = req.session;
    session.tag = 'logout';
    console.log("Currently in main.js. Logging out");
    res.end();
}