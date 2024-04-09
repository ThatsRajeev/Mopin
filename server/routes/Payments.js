const express = require('express');
const { createPayment, verifyPayment, fetchPaymentStatus } = require('../controller/Payment');

const router = express.Router();
// /payments is already added in base path
router.post('/', createPayment)
      .post('/verify', verifyPayment)
      .get('/:id', fetchPaymentStatus);

exports.router = router;
