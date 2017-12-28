const firebase = require('firebase');

const firebaseConfig = (data) => {
    var config = {
        apiKey: data.apiKey,
        authDomain: data.authDomain,
        databaseURL: data.databaseURL,
        storageBucket: data.storageBucket,
    };

    firebase.initializeApp(config);
    return firebase;
}
module.exports = firebaseConfig;