const express = require('express');
const router = express.Router();
const stuffController = require('../controllers/stuffController');

router.get('/:user_id', stuffController.getAllStuff); // Get barang by User
router.post('/', stuffController.createStuff);        // Tambah barang
router.put('/:id', stuffController.updateStuff);      // Edit barang
router.delete('/:id', stuffController.deleteStuff);   // Hapus barang

module.exports = router;