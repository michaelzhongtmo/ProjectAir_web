// export default function insertData(firebaseConfig,file_path ,data){
//     firebaseConfig.database().ref(file_path).set(data);
//     return true;
// };

const insertData = (firebaseConfig,file_path ,data) => {
    firebaseConfig.database().ref(file_path).set(data);
    return true;
}
module.exports = insertData;