const express = require('express');
const { createSeller, fetchAllSellers, fetchSellerById, updateSeller } = require('../controller/Seller');

const router = express.Router();
// /sellers is already added in base path
router.post('/', createSeller)
      .get('/', fetchAllSellers)
      .get('/:id', fetchSellerById)
      .patch('/:id', updateSeller);

exports.router = router;
