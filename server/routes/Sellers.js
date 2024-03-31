const express = require('express');
const { createSeller, fetchAllSellers } = require('../controller/Seller');

const router = express.Router();
// /sellers is already added in base path
router.post('/', createSeller)
      .get('/', fetchAllSellers);

exports.router = router;
