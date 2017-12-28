const searchByValue = (firebaseConfig, data_path, searchKey, searchValue, callback) => {
    var fbRef = firebaseConfig.database().ref().child(data_path);
     fbRef.orderByChild(`${searchKey}`)
    .equalTo(searchValue)
    .once('child_added', function(snap) {
        // return snap;
        callback(snap);
    });
}
module.exports = searchByValue;