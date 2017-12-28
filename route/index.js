var session

exports.view = function(req, res, next){
    console.log('Currently in route/index.js')
    session = req.session;
    res.render('index', {error_msg: session.error});

    // Delete session if exists. Removing error message on refresh.
    if(session){
        session.destroy(function(error){
            if(error)
                console.log("Session cannot be destroyed", error, '\n');
        });
    }
}

exports.login = function(req, res, next){
    session = req.session;

    // Flagging current process
    session.tag = "login";
    session.uid = req.body.uid;
    
    console.log("Currently in index.js. Logging in. User's uid is " + session.uid);
    res.end();
}

exports.register = function(req, res, next){
    session = req.session;

    // Flagging current process
    session.tag = "register";

    if(req.body.reg_password != req.body.reg_password2){
        console.log("Passwords donot patch");
        session.error = "Password not matching.";
        res.redirect('/#register');
    }
    
    else{
        session.first_name = req.body.reg_first_name;
        session.last_name = req.body.reg_last_name;
        session.email = req.body.reg_email;
        session.password = req.body.reg_password;
        session.password2 = req.body.reg_password2;

        console.log("FN: ", session.first_name);
        console.log("LN: ", session.last_name);
        console.log("EM: ", session.email);
        console.log("PW: ", session.password);
        console.log("PW2: ", session.password2);


        res.redirect('/loading');
    }
}