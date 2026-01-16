const db = require('../config/db');

exports.addTransaction = (req, res) => {
    const { stuff_id, nominal } = req.body;
    
    // SRS TRX-01: Validasi angka positif
    if (nominal <= 0) return res.status(400).json({ message: "Nominal harus lebih dari 0" });

    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    // Insert ke history. Trigger database akan otomatis update uang_terkumpul di tbl_stuff
    const sql = "INSERT INTO tbl_history (stuff_id, nominal, tanggal) VALUES (?, ?, ?)";
    db.query(sql, [stuff_id, nominal, today], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Saldo berhasil ditambahkan!" });
    });
};

exports.getHistory = (req, res) => {
    const stuffId = req.params.stuff_id;
    // SRS TRX-06: Menampilkan riwayat transaksi
    const sql = "SELECT * FROM tbl_history WHERE stuff_id = ? ORDER BY history_id DESC";
    db.query(sql, [stuffId], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};


exports.getHistoryByUser = (req, res) => {
    const { userId } = req.params;

    const query = `
        SELECT h.history_id, h.nominal, h.tanggal, s.nama_barang 
        FROM tbl_history h
        JOIN tbl_stuff s ON h.stuff_id = s.stuff_id
        WHERE s.user_id = ?
        ORDER BY h.history_id DESC
    `;

    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};