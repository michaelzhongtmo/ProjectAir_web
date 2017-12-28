
const selectData = (firebaseConfig, data_path, getFrom = 'value', callback) => {
    var latestSnapshot = null;
    fbRef = firebaseConfig.database().ref(data_path);
    fbRef.once(getFrom, (snapshot) => {
        let val = snapshot.val();
        callback(val);
    });
}
module.exports = selectData;