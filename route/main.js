exports.view = function(req, res, next){
    console.log("\nCurrently in route/main.js");

    var session = req.session;
    var admin = require('firebase-admin');
    var db = admin.database();
    var userPadRef = db.ref("users/" + session.uid + "/pad");
    var padRef = db.ref("/pads");
    var name;
    var email
    var padArray;
    var padPicURLArray = [];

    admin.auth().getUser(session.uid)
        .then(function(userRecord) {
        name = userRecord.displayName;
        email = userRecord.email;

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
            console.log("User owns pad: " + padPicURLArray);
            // Rendering main page
            res.render('main', {userName: name, userEmail: email, padArray: padArray, padPicURLArray: padPicURLArray});
        },500); 
        
    }).catch(function(error){
        console.log("Cannot access user's pad data", error);
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