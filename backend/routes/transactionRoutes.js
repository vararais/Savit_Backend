const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/', transactionController.addTransaction);         // Quick Add
router.get('/history/:stuff_id', transactionController.getHistory); // Lihat Riwayat

module.exports = router;