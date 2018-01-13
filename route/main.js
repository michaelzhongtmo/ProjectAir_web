exports.view = function(req, res, next){
    console.log("\nCurrently in route/main.js");

    var session = req.session;
    var admin = require('firebase-admin');
    var db = admin.database();
    var userPadRef = db.ref("users/" + session.uid + "/pad");
    var padRef = db.ref("/pads");
    var padArray;
    var padPicURLArray = [];

    admin.auth().getUser(session.uid)
        .then(function(userRecord) {
        session.name = userRecord.displayName;
        session.email = userRecord.email;

        console.log("\nSuccessfully fetched user data:", userRecord.toJSON());

    })
        .catch(function(error) {
        console.log("Error fetching user data:", error);
        session.error = error;
        res.redirect('/');
    });

    userPadRef.once('value').then(function(snapshot){
        console.log("Accessing user's pad data.");
        pads = snapshot.val();
        padArray = pads.split(',');
        console.log("User owns pad: " + padArray);

        for(i=0; i<padArray.length; i++){
            console.log("Firebase reference point: " + padRef);
            console.log("Accessing Pad ID: " + padArray[i]);

            padRef.child(padArray[i]).child("picURL").once('value', function(snapshot){
                console.log("\nConcacnating picURL: " + snapshot.val());

                padPicURLArray = padPicURLArray.concat(snapshot.val());
            });
        }

        // Waiting for firebase async query to finish before rendering page
        setTimeout(function(){
            console.log("Done. Rendering main page.");
            // Rendering main page
            res.render('main', {userName: session.name, userEmail: session.email, padArray: padArray, padPicURLArray: padPicURLArray});
        },500); 

    }).catch(function(error){
        console.log("Cannot access user's pad data", error);
        session.error = error;
        res.redirect('/');
    });

}

exports.load = function(req, res, next){
    console.log("\nCurrently in devices.js.");
    session = req.session;
    req.session.tag = "main";
    res.end();
    console.log("Exiting devices.js.");
}

exports.logout = function (req, res, next){
    var session = req.session;
    session.tag = 'logout';
    console.log("Currently in main.js. Logging out");
    res.end();
}