const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { getDatabase } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/auth/login
 * Authenticate admin user and return JWT token
 */
router.post('/login', [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password } = req.body;
        const db = getDatabase();

        // Find admin user
        const admin = await db.collection('admin').findOne({ username });

        if (!admin) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, admin.password);

        if (!isValidPassword) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        // Generate JWT token (valid for 24 hours)
        const token = jwt.sign(
            {
                username: admin.username,
                userId: admin._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            token,
            expiresIn: '24h',
            username: admin.username
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            error: 'Server error during login'
        });
    }
});

/**
 * POST /api/auth/change-password
 * Change admin password (requires authentication)
 */
router.post('/change-password', authenticateToken, [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { currentPassword, newPassword } = req.body;
        const db = getDatabase();

        // Find admin user
        const admin = await db.collection('admin').findOne({ username: req.user.username });

        if (!admin) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify current password
        const isValidPassword = await bcrypt.compare(currentPassword, admin.password);

        if (!isValidPassword) {
            return res.status(401).json({
                error: 'Current password is incorrect'
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await db.collection('admin').updateOne(
            { username: req.user.username },
            {
                $set: {
                    password: hashedPassword,
                    updatedAt: new Date()
                }
            }
        );

        res.json({
            success: true,
            message: 'Password updated successfully'
        });

    } catch (error) {
        console.error('Password change error:', error);
        res.status(500).json({
            error: 'Server error during password change'
        });
    }
});

/**
 * POST /api/auth/verify
 * Verify if current token is valid
 */
router.post('/verify', authenticateToken, (req, res) => {
    res.json({
        success: true,
        username: req.user.username
    });
});

module.exports = router;
