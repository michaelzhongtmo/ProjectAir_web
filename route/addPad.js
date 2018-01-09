exports.view = function (req, res, next){
    console.log('\nCurrently in view addPad.js')
    console.log('Rendering addPad page.')
    res.render('addPad');
}

exports.addPad = function (req, res, next){
    console.log('\nCurrently in addPad addPad.js');
    var session = req.session;
    session.tag = 'addPad'
    session.padUID = req.body.padUID;
    console.log('Redirecting to Loading');
    res.redirect('/loading');
}