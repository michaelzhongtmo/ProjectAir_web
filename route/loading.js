exports.view = function (req, res, next){
    res.render('loading');
}

exports.task = function (req, res, next){
    var session = req.session;
    var email = session.login_email;
    var password = session.login_password;

    // Performing login
    if(session.tag == "login"){
        console.log("currently in route.loading.js task method");
        var uid = session.uid;
        if(uid){
            res.redirect('/main');
        }
    }

    // Performing registration
    else if(session.tag == "register"){
        var first_name = session.first_name;
        var last_name = session.last_name;
        var email = session.email;
        var password = session.password;


        console.log("\nCurrently in route/loading.js");
        console.log("FN: ", session.first_name);
        console.log("LN: ", session.last_name);
        console.log("EM: ", session.email);
        console.log("PW: ", session.password);

        var admin = require("firebase-admin");

        console.log(email);
        admin.auth().getUserByEmail(email)
            .then(function(userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully fetched user data:", userRecord.toJSON());
            console.log(userRecord.email + " already registered. Try logging in.");
            session.error = userRecord.email + " already exists." + '\n' + "Try logging in.";
            console.log("Redirecting to /");
            res.redirect('/');
        })

        // If cannot find user by email, create user.
            .catch(function(error) {
            console.log("Failed to fetch user data", error);
            admin.auth().createUser({
                email: email,
                emailVerified: false,
                password: password,
                displayName: first_name + " " + last_name,
                disabled: false
            })
                .then(function(userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log("Successfully created new user:", userRecord.uid);
                session.uid = userRecord.uid;
                res.redirect('/main')
            })
                .catch(function(error) {
                console.log("Error creating new user:", error.message);
                session.error = error.message;
                res.redirect('/');
            });
        });
    }
    else if(session.tag == "logout"){
        
        console.log("In loading.js. Logging out");
        session.destroy(function(error){
            console.log("In loading.js. Ualbe to destroy session during logout.");
        });
        res.redirect('/');
    }    
}