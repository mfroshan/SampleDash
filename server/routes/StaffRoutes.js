const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const customLimiter = require('../middleware/apiRateLimit');

require('dotenv').config();

const router = express.Router();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret-key';

// Middleware for checking staff role
function checkStaffRole(req, res, next) {
    const authcookie = req.cookies.authcookie;

    jwt.verify(authcookie, JWT_SECRET_KEY , (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else if (data.user && data.user.role === 'staff') {
            req.user = data.user;
            next();
        } else {
            res.sendStatus(403);
        }
    });
}

router.get('/data', customLimiter, (req, res) => {
    console.log('Request received for /data'); // Add this line

    // Logic for fetching staff-specific data from the database
    db.query('SELECT * FROM tbl_host', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length > 0) {
            return res.status(200).json({ message: 'Host data fetched successfully', data: results });
        } else {
            console.log('No Results Found'); // Add this line
            return res.status(404).json({ message: 'No Results Found' });
        }
    });
});

module.exports = router;
