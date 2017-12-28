const updateData = (firebaseConfig, file_path, data) => {
    let updateData = {};
    updateData[file_path] = data;
    firebaseConfig.database().ref().update(updateData);
    return true;
}
module.exports = updateData;