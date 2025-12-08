const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { body, validationResult } = require('express-validator');
const { getDatabase } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../../uploads');

        // Create uploads directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Generate unique filename: timestamp-originalname
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only image files (JPEG, PNG, GIF, WebP) are allowed'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
    fileFilter: fileFilter
});

/**
 * GET /api/projects
 * Get all projects (public endpoint)
 */
router.get('/', async (req, res) => {
    try {
        const db = getDatabase();
        const projects = await db.collection('projects')
            .find({})
            .sort({ id: -1 }) // Sort by ID descending (newest first)
            .toArray();

        res.json({
            success: true,
            projects
        });

    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            error: 'Failed to fetch projects'
        });
    }
});

/**
 * POST /api/projects
 * Add a new project (protected - requires authentication)
 */
router.post('/', authenticateToken, upload.single('image'), [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('category').trim().notEmpty().withMessage('Category is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Delete uploaded file if validation fails
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, category } = req.body;
        const db = getDatabase();

        // Verify category exists
        const categoryExists = await db.collection('categories').findOne({ slug: category });
        if (!categoryExists) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({
                error: 'Invalid category'
            });
        }

        // Generate image path
        let imagePath = '';
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        } else {
            return res.status(400).json({
                error: 'Image file is required'
            });
        }

        // Create new project
        const newProject = {
            id: Date.now(), // Use timestamp as unique ID
            title,
            description,
            category,
            image: imagePath,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await db.collection('projects').insertOne(newProject);

        res.status(201).json({
            success: true,
            message: 'Project added successfully',
            project: newProject
        });

    } catch (error) {
        console.error('Error adding project:', error);

        // Delete uploaded file if database operation fails
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({
            error: 'Failed to add project'
        });
    }
});

/**
 * DELETE /api/projects/:id
 * Delete a project (protected - requires authentication)
 */
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const projectId = parseInt(req.params.id);
        const db = getDatabase();

        // Find project before deleting to get image path
        const project = await db.collection('projects').findOne({ id: projectId });

        if (!project) {
            return res.status(404).json({
                error: 'Project not found'
            });
        }

        // Delete project from database
        await db.collection('projects').deleteOne({ id: projectId });

        // Delete associated image file
        if (project.image && project.image.startsWith('/uploads/')) {
            const imagePath = path.join(__dirname, '../..', project.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        res.json({
            success: true,
            message: 'Project deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({
            error: 'Failed to delete project'
        });
    }
});

module.exports = router;
