exports.view = function (req, res, next){
    res.render('loading');
}

// Tasks to be perfomred on loading screen. Filtered by a tag in session variable
exports.task = function (req, res, next){
    var session = req.session;
    var email = session.login_email;
    var password = session.login_password;

    // If calling action is Login
    if(session.tag == "login"){
        console.log("currently in route.loading.js task method");
        var uid = session.uid;
        if(uid){
            res.redirect('/main');
        }
    }

    // If calling action is Register
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
        
        // Checking to see if user already exists.
        admin.auth().getUserByEmail(email)
            .then(function(userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("\nSuccessfully fetched user data:", userRecord.toJSON());
            console.log(userRecord.email + " already registered. Try logging in.");
            session.error = userRecord.email + " already exists." + '\n' + "Try logging in.";
            console.log("Redirecting to /");
            res.redirect('/');
        })

            // If cannot find user by email, create user.
            .catch(function(error) {
            console.log("\nFailed to fetch user data", error);
            admin.auth().createUser({
                email: email,
                emailVerified: false,
                password: password,
                displayName: first_name + " " + last_name,
                disabled: false
            })

            // If user doesnt exist, create user
                .then(function(userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log("\nSuccessfully created new user:", userRecord.uid);
                session.uid = userRecord.uid;

                console.log("\nChecking database for user record.");
                
                // Checking if user's role has been assigned
                var db = admin.database();
                var ref = db.ref("/userRole");
                ref.child(session.uid).once('value', function(snapshot){

                    // If user role hasn't been assigned, assign role.
                    if(snapshot.val() === null){
                        ref.child(session.uid).set({
                            role: "user"
                        });
                        console.log("User role assigned");
                        res.redirect("/main");
                    }

                    // If user role has already been assigned, mark error.
                    else{
                        console.log("User role already exists: " + snapshot.val());
                        session.error = "User role already exists"
                    }
                });
            })

            // If user cannot be created, throw error
                .catch(function(error) {
                console.log("\nError creating new user:", error.message);
                session.error = error.message;
                res.redirect('/');
            });
        });
    }

    // If calling action is Logout.
    else if(session.tag == "logout"){

        console.log("In loading.js. Logging out");
        session.destroy(function(error){
            if(error)
                console.log("In loading.js. Ualbe to destroy session during logout.");
        });
        res.redirect('/');
    }    
}