exports.view = function (req, res, next){
    res.render('loading');
}

// Tasks to be perfomred on loading screen. Filtered by a tag in session variable
exports.task = function (req, res, next){
    var session = req.session;
    var email = session.login_email;
    var password = session.login_password;
    var admin = require("firebase-admin");
    var db = admin.database();

    // If calling action is Login
    if(session.tag == "login"){
        console.log("currently in route.loading.js task method");
        var uid = session.uid;
        if(uid){
            var ref = db.ref('/users');
            ref.child(session.uid).child('pad').once('value', function(snapshot){
                if(snapshot.val() === null){
                    console.log("Login user does not have a pad assigned: " + snapshot.val());
                    res.redirect('/addPad');
                }
                else
                    // Redirect to main page
                    res.redirect('/main');
            });
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
                var ref = db.ref("/users");
                ref.child(session.uid).once('value', function(snapshot){

                    // If user role hasn't been assigned, assign role.
                    if(snapshot.val() === null){
                        ref.child(session.uid).set({
                            role: "user"
                        });
                        console.log("User role assigned");
                        res.redirect("/addPad");
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

    // Setting pad to user's account.
    else if(session.tag == "addPad"){
        console.log("\nCurrently in addPad addPad.js");

        console.log("Accessing user's pads data on Firebase");
        var userRef = db.ref("/users/"+session.uid);
        var userPadRef = db.ref("/users/"+session.uid+"/pad");
        var padRef = db.ref("/pads")

        userPadRef.once('value', function(snapshot){
            console.log("Checking if user has pads");

            if(snapshot.val() !== null){
                console.log("User has pad assigned.", snapshot.val());
                console.log("Redirecting to main page")
                res.redirect('/main');
            }

            else{
                console.log("User does not have Pad assigned. Creating Pad.");

                //Adding new pad to Pads database and saving unique key for pad 
                var newPadKeyRef = padRef.push({
                    owner: session.uid,
                    picURL: "https://firebasestorage.googleapis.com/v0/b/project-air-34a3f.appspot.com/o/pads%2Fpad.jpg?alt=media&token=de3c69cb-b17f-4828-bbaf-db496c0f5d36"
                });

                // Saving the unique key
                var newPadKey = newPadKeyRef.key;

                console.log("New Pad unique key is: " + newPadKey)

                // Updating pad on user's Pad Record
                userRef.update({
                    "pad": newPadKey
                });

                console.log("Redirecting to main page");
                res.redirect('/main');
            }

        }).catch(function(error){
            session.error = error;
            console.log("Error occured while checking if user has pad", error);
            console.log("Redirecting back to login page.");
            res.redirect('/');
        });
    }

    else if(session.tag === "devices"){
        // Redirecting to devices page
        console.log("\nCurrently in loading.js devices task.");
        console.log("Exiting loading.js");
        res.redirect('/devices');
    }

    else if(session.tag === "main"){
        // Redirecting to devices page
        console.log("\nCurrently in loading.js devices task.");
        console.log("Exiting loading.js");
        res.redirect('/main');
    }
}