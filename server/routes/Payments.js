const express = require('express');
const { createPayment, verifyPayment, fetchPaymentStatus } = require('../controller/Payment');
const { readRawBody } = require('../middleware/readRawBody');

const router = express.Router();
// /payments is already added in base path
router.post('/', createPayment)
      .post('/verify', express.raw({ type: 'application/json' }), verifyPayment)
      .get('/:id', fetchPaymentStatus);

exports.router = router;
