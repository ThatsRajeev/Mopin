const express = require('express');
const { createOrder, fetchAllOrders, fetchOrderByNumber, updateOrder } = require('../controller/Order');

const router = express.Router();
// /sellers is already added in base path
router.post('/', createOrder)
      .get('/', fetchAllOrders)
      .get('/:phoneNumber', fetchOrderByNumber)
      .patch('/', updateOrder);

exports.router = router;
