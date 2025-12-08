const express = require('express');
const { body, validationResult } = require('express-validator');
const { getDatabase } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/categories
 * Get all categories (public endpoint)
 */
router.get('/', async (req, res) => {
    try {
        const db = getDatabase();
        const categories = await db.collection('categories')
            .find({})
            .sort({ slug: 1 })
            .toArray();

        // Return just the slugs for frontend compatibility
        const categoryList = categories.map(cat => cat.slug);

        res.json({
            success: true,
            categories: categoryList
        });

    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            error: 'Failed to fetch categories'
        });
    }
});

/**
 * POST /api/categories
 * Add a new category (protected - requires authentication)
 */
router.post('/', authenticateToken, [
    body('name').trim().notEmpty().withMessage('Category name is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name } = req.body;
        const db = getDatabase();

        // Create slug from name (lowercase, replace spaces with hyphens)
        const slug = name.toLowerCase().trim().replace(/\s+/g, '-');

        // Check if category already exists
        const existingCategory = await db.collection('categories').findOne({ slug });
        if (existingCategory) {
            return res.status(409).json({
                error: 'Category already exists'
            });
        }

        // Create new category
        const newCategory = {
            slug,
            name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
            createdAt: new Date()
        };

        await db.collection('categories').insertOne(newCategory);

        res.status(201).json({
            success: true,
            message: 'Category added successfully',
            category: newCategory
        });

    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({
            error: 'Failed to add category'
        });
    }
});

/**
 * DELETE /api/categories/:slug
 * Delete a category and all associated projects (protected - requires authentication)
 */
router.delete('/:slug', authenticateToken, async (req, res) => {
    try {
        const slug = req.params.slug;
        const db = getDatabase();

        // Find category
        const category = await db.collection('categories').findOne({ slug });

        if (!category) {
            return res.status(404).json({
                error: 'Category not found'
            });
        }

        // Count projects in this category
        const projectCount = await db.collection('projects').countDocuments({ category: slug });

        // Delete all projects in this category
        if (projectCount > 0) {
            // Get all projects to delete their images
            const projects = await db.collection('projects').find({ category: slug }).toArray();

            // Delete image files
            const fs = require('fs');
            const path = require('path');

            projects.forEach(project => {
                if (project.image && project.image.startsWith('/uploads/')) {
                    const imagePath = path.join(__dirname, '../..', project.image);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                }
            });

            // Delete projects from database
            await db.collection('projects').deleteMany({ category: slug });
        }

        // Delete category
        await db.collection('categories').deleteOne({ slug });

        res.json({
            success: true,
            message: `Category deleted successfully. ${projectCount} project(s) also deleted.`,
            deletedProjects: projectCount
        });

    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({
            error: 'Failed to delete category'
        });
    }
});

module.exports = router;
