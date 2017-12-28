// import firebaseConfig from './core';
const firebaseConfig = require('./core');
const insertData = require('../module/insert');
const selectData = require('../module/select');
const updateData = require('../module/update');
const deleteData = require('../module/delete');
const authFacebook = require('../module/authFacebook');
const authUser = require('../module/authUser');
const searchData = require('../module/search');

// import * as authUser from '../module/authUser';
// import * as searchData from '../module/search';

module.exports = {
  firebaseConfig,
  insertData,
  selectData,
  updateData,
  deleteData,
  authUser,
  authFacebook,
  searchData
};
