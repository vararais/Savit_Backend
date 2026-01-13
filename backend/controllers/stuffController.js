const db = require('../config/db');

// Ambil semua barang milik user tertentu
exports.getAllStuff = (req, res) => {
    const userId = req.params.user_id;
    const sql = "SELECT * FROM tbl_stuff WHERE user_id = ?";
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

// Tambah Barang (SRS BRG-01)
exports.createStuff = (req, res) => {
    const { user_id, nama_barang, harga_barang, rencana_hari, prioritas } = req.body;
    
    if (!nama_barang || !harga_barang || !user_id) {
        return res.status(400).json({ message: "Data tidak lengkap" });
    }

    const sql = "INSERT INTO tbl_stuff (user_id, nama_barang, harga_barang, rencana_hari, prioritas, uang_terkumpul) VALUES (?, ?, ?, ?, ?, 0)";
    db.query(sql, [user_id, nama_barang, harga_barang, rencana_hari, prioritas], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Barang berhasil ditambahkan" });
    });
};

// Edit Barang
exports.updateStuff = (req, res) => {
    const stuffId = req.params.id;
    const { nama_barang, rencana_hari, prioritas, harga_barang } = req.body;
    
    // SRS BRG-02: Update data
    const sql = "UPDATE tbl_stuff SET nama_barang=?, rencana_hari=?, prioritas=?, harga_barang=? WHERE stuff_id=?";
    db.query(sql, [nama_barang, rencana_hari, prioritas, harga_barang, stuffId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Data berhasil diperbarui" });
    });
};

// Hapus Barang (SRS BRG-03)
exports.deleteStuff = (req, res) => {
    const stuffId = req.params.id;
    const sql = "DELETE FROM tbl_stuff WHERE stuff_id=?";
    db.query(sql, [stuffId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Data berhasil dihapus" });
    });
};