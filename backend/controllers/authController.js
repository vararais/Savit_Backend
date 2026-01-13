const db = require('../config/db');
const bcrypt = require('bcryptjs'); // Untuk keamanan password (SRS Security)

exports.register = (req, res) => {
    // SRS USR-01: Validasi input tidak boleh kosong
    const { nama, email, password } = req.body;
    if (!nama || !email || !password) return res.status(400).json({ message: "Data tidak lengkap" });

    // SRS Security: Password di-hash
    const hashedPassword = bcrypt.hashSync(password, 8);

    const sql = "INSERT INTO tbl_user (nama_lengkap, email, password) VALUES (?, ?, ?)";
    db.query(sql, [nama, email, hashedPassword], (err, result) => {
        if (err) {
            // Cek duplicate email
            if(err.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: "Email sudah terdaftar" });
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Registrasi Berhasil!" });
    });
};

exports.login = (req, res) => {
    // SRS USR-02: Verifikasi email dan password
    const { email, password } = req.body;

    const sql = "SELECT * FROM tbl_user WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: "Email tidak ditemukan" });

        const user = results[0];
        // Cek password hash
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) return res.status(401).json({ message: "Password Salah" });

        res.json({
            message: "Login Berhasil",
            user_id: user.user_id,
            nama: user.nama_lengkap
        });
    });
};