const express = require('express');
const { fetchUserByNumber, createUser, updateUser } = require('../controller/User');

const router = express.Router();
// /sellers is already added in base path
router.post('/', createUser)
      .get('/:phoneNumber', fetchUserByNumber)
      .patch('/:phoneNumber', updateUser);

exports.router = router;
