# firebase-nodejs [![Build Status](https://thinnakrit.github.io/badge/firebase-nodejs.svg)](https://www.npmjs.com/package/firebase-nodejs)   [![Build Status](https://thinnakrit.github.io/badge/firebase-nodejs-version.svg)](https://www.npmjs.com/package/firebase-nodejs)   [![Build Status](https://thinnakrit.github.io/badge/firebase-version.svg)](https://www.npmjs.com/package/firebase-nodejs)

# Fixed bugs `8/2/2017`
- [x] Add callback to the some function
- [x] Remove default path

List function update, have a `callback` function
- [x] selectData
- [x] authFacebook
- [x] authUser `updateUser` `updateEmail` `sendVerifyEmail` `changePassword` `deleteUser` `logout`

# Example new version updated.

Before updated : Have a error from return Promise, now edit.
```js
firebaseDom.default.selectData(firebase, data_path, 'value');
```

New version : Remove default path.
Before :
```js
firebaseDom.default.firebaseConfig
```
Now :
```js
firebaseDom.firebaseConfig
```

New version : Add callback function for return value from firebase query. But can't return out the function, you can use state from push on state.
```js
firebaseDom.selectData(firebase, data_path, 'value', callback => {
   this.setState({
      callback: callback,
   });
});
```


# Firebase SDK for Node.js

Get install !!
```
npm install --save firebase-nodejs firebase
```

## Optionals

* selectData 
For select data from firebase
* insertData
For insert data into firebase
* deleteData
For delete data on firebase
* updateData
For update data on firebase
* authUser
For manage user on firebase
* authFacebook
For auth from facebook

### New update 5/3/2017
* searchData => searchByValue
You can use for search data by value

## How to use it ?

Create firebase.js on you app folder, and write code below.
You can use data from your firebase project.
```js
import * as firebaseDom from 'firebase-nodejs';

var config = {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    storageBucket: '',
};
const firebase = firebaseDom.firebaseConfig(config);
export default firebase;
```

So you add my code on you another file for use firebase.

## Examples
```js
import firebase from './firebase'; //add you firebase.js path
import * as firebaseDom from 'firebase-nodejs';

export class TestApp extends Component{
  constructor(props) {
    super(props);
    this.state = {
      member: {},
    };
  }
  
  getMemberData(){
    let memberData = firebaseDom.selectData(firebase, '/member/id/1', 'value', callback => {
        this.setState({
           member: callback,
        });
    });
  }
  
  render(){
     return(
       .
       .
       .
     )
   }
}

```

## Use another

## authUser an authFacebook
You can authen user from firebase, Use facebook  loggin only.

Get current user.

```js
const data = firebaseDom.authUser.currentUser(firebase);
```

Logon by use facebook access token.
```js
firebaseDom.authFacebook(firebase, accessToken , callback => {
    console.log(callback);
});
```

User data.
```js
let currentUserData = firebaseDom.authUser.currentUser(firebase);
currentUserData.name = 'new my name';
firebaseDom.authUser.updateUser(firebase, currentUserData, callback => {
    console.log(callback);
});
```

User email.
```js
firebaseDom.authUser.updateEmail(firebase, 'new_email@mail.com', callback => {
    console.log(callback);
});
```


User delete.
```js
firebaseDom.authUser.deleteUser(firebase, callback => {
    console.log(callback);
});
```
Logout !
```js
firebaseDom.authUser.logout(firebase, callback => {
    console.log(callback);
});
```

## searchData

Search by value
```js
const searchKey = 'member_name';
const searchValue = 'handdleName';
firebaseDom.searchData.searchByValue(firebase, '/member/id/', searchKey, searchValue, callback => {
    console.log(callback);
})

```

## selectData

```js
firebaseDom.selectData(firebase, '/member/id/1', 'value', callback => {
    console.log(callback);
});

```

## insertData

```js
const member = {
  name: 'test',
  age: 17,
}
const insertStatus = firebaseDom.insertData(firebase, '/member/id/2', member);

```


## updateData

```js
const member = {
  name: 'test',
  age: 18,
}
const updateStatus = firebaseDom.updateData(firebase, '/member/id/2', member);

```

## deleteData

```js
const deleteStatus = firebaseDom.deleteData(firebase, '/member/id/2');

```
