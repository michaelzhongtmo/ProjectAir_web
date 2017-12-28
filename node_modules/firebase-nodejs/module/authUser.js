// export function currentUser(firebaseConfig){
//     const user = firebaseConfig.auth().currentUser;
//     if (user) {
//         return user;
//     } else {
//         return false;
//     }
// }
const currentUser = (firebaseConfig) => {
    const user = firebaseConfig.auth().currentUser;
    if (user) {
        // callback(user);
        return user;
    } else {
        // callback(false);
        return false;
    }
}

const updateUser = (firebaseConfig, data, callback) => {
    const user = currentUser(firebaseConfig);
    user.updateProfile(data).then(function() {
        // return true;
        callback(true);
    }, function(error) {
        callback(error);
        // return error;
    });
}

const updateEmail = (firebaseConfig, new_email, callback) => {
    const user = currentUser(firebaseConfig);
    user.updateEmail(new_email).then(function() {
        callback(true);
        // return true;
    }, function(error) {
        callback(error);
        // return error;
    });
}

const sendVerifyEmail = (firebaseConfig, callback) => {
     const user = currentUser(firebaseConfig);
    user.sendEmailVerification().then(function() {
        // return true;
        callback(true);
    }, function(error) {
        // return error;
        callback(error);
    });
}

const changePassword = (firebaseConfig, new_password, callback) => {
    const user = currentUser(firebaseConfig);
    user.updatePassword(new_password).then(function() {
        // return true;
        callback(true);
    }, function(error) {
        // return error;
        callback(error);
    });
}

const deleteUser = (firebaseConfig, callback) => {
    const user = currentUser(firebaseConfig);
    user.delete().then(function() {
        // return true;
        callback(true);
    }, function(error) {
        // return error;
        callback(error);
    });
}

const logout = (firebaseConfig, callback) => {
    firebaseConfig.auth().signOut().then(function() {
        // return true;
        callback(true);
    }, function(error) {
        // return error;
        callback(error);
    });
}


module.exports = { currentUser, updateUser, updateEmail, sendVerifyEmail, changePassword, deleteUser, logout };
