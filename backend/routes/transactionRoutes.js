const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/', transactionController.addTransaction);

router.get('/:stuff_id', transactionController.getHistory);

router.get('/history/:userId', transactionController.getHistoryByUser);

module.exports = router;