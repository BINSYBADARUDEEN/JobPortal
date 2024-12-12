const db = require('../database/connection');
exports.login = (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (results.length === 0) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }
        const user = results[0];
        res.send({
            message: 'Login successful',
            user: { id: user.id, username: user.username, role: user.role}
        });
    });
};