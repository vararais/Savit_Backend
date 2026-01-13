const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const stuffRoutes = require('./routes/stuffRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Agar bisa diakses dari Android (beda device/emulator)
app.use(bodyParser.json()); // Menerima data JSON dari Android

// Gunakan Routes dengan prefix '/api'
app.use('/api/auth', authRoutes);
app.use('/api/stuff', stuffRoutes);
app.use('/api/transaction', transactionRoutes);

// Cek status server
app.get('/', (req, res) => {
    res.send("Server Sav'It Berjalan!");
});

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});