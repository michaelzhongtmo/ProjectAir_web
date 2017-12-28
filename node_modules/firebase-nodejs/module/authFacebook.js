// export default function authFacebook(firebaseConfig, accessToken){
//     const credential = firebaseConfig.auth.FacebookAuthProvider.credential(String(accessToken));
//     firebaseConfig.auth().signInWithCredential(credential)
//     .then( res => {
//         return res;
//     })
//     .catch((error) => {
//         return error;
//     });
// }


const authFacebook = (firebaseConfig, accessToken, callback) => {
    const credential = firebaseConfig.auth.FacebookAuthProvider.credential(String(accessToken));
    firebaseConfig.auth().signInWithCredential(credential)
    .then( res => {
        callback(res);
        // return res;
    })
    .catch((error) => {
        callback(error);
        // return error;
    });
}
module.exports = authFacebook;