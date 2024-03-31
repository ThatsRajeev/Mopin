const express = require('express');
const { fetchAddressByNumber, createAddress, deleteAddress } = require('../controller/Address');

const router = express.Router();
// /sellers is already added in base path
router.post('/', createAddress)
      .get('/:encodedPhoneNumber', fetchAddressByNumber)
      .delete('/:encodedPhoneNumber', deleteAddress);

exports.router = router;
