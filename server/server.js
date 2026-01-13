const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const { connectToDatabase } = require('./config/database');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const categoryRoutes = require('./routes/categories');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use((req, res, next) => {
    console.log(`[Request] ${req.method} ${req.url}`);
    next();
});

// Very permissive CORS for debugging + explicit support for local files (null origin)
app.use(cors({
    origin: function (origin, callback) {
        // Allow if no origin (e.g. file://) or if origin is string 'null'
        if (!origin || origin === 'null') return callback(null, true);
        return callback(null, true);
    },
    credentials: true
}));
app.options('*', cors()); // Enable pre-flight for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/categories', categoryRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'DnD Couture API is running',
        timestamp: new Date().toISOString()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to DnD Couture Portfolio API',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            auth: '/api/auth',
            projects: '/api/projects',
            categories: '/api/categories'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.path
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);

    // Multer errors
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            error: 'File upload error: ' + err.message
        });
    }

    res.status(500).json({
        error: err.message || 'Internal server error'
    });
});

// Start server
async function startServer() {
    try {
        // Connect to database
        await connectToDatabase();

        // Start listening
        app.listen(PORT, () => {
            console.log(`\n🚀 DnD Couture API Server running on port ${PORT}`);
            console.log(`📍 API available at: http://localhost:${PORT}`);
            console.log(`🏥 Health check: http://localhost:${PORT}/health`);
            console.log(`\n🔐 Default admin credentials:`);
            console.log(`   Username: admin`);
            console.log(`   Password: admin123`);
            console.log(`\n⚠️  Change the password after first login!\n`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Handle shutdown gracefully
process.on('SIGINT', async () => {
    console.log('\n\n⏹️  Shutting down server...');
    const { closeDatabaseConnection } = require('./config/database');
    await closeDatabaseConnection();
    process.exit(0);
});

startServer();
