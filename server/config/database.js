const { MongoClient } = require('mongodb');
require('dotenv').config();

let db = null;
let client = null;

/**
 * Connect to MongoDB and return database instance
 */
async function connectToDatabase() {
    if (db) {
        return db; // Return existing connection
    }

    try {
        const uri = process.env.MONGODB_URI;

        if (!uri) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await client.connect();
        console.log('✅ Connected to MongoDB successfully');

        // Get database name from URI or use default
        const dbName = new URL(uri).pathname.slice(1).split('?')[0] || 'dnd-portfolio';
        db = client.db(dbName);

        // Initialize collections if they don't exist
        await initializeCollections(db);

        return db;
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        throw error;
    }
}

/**
 * Initialize collections with indexes and default data
 */
async function initializeCollections(database) {
    try {
        // Create collections if they don't exist
        const collections = await database.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);

        // Projects collection
        if (!collectionNames.includes('projects')) {
            await database.createCollection('projects');
            await database.collection('projects').createIndex({ id: 1 }, { unique: true });
            console.log('Created projects collection');
        }

        // Categories collection
        if (!collectionNames.includes('categories')) {
            await database.createCollection('categories');
            await database.collection('categories').createIndex({ slug: 1 }, { unique: true });

            // Insert default categories
            const defaultCategories = [
                { slug: 'ankara', name: 'Ankara', createdAt: new Date() },
                { slug: 'street', name: 'Street', createdAt: new Date() },
                { slug: 'eloise', name: 'Eloise', createdAt: new Date() },
                { slug: 'official', name: 'Official', createdAt: new Date() },
                { slug: 'kids', name: 'Kids', createdAt: new Date() },
                { slug: 'casual', name: 'Casual', createdAt: new Date() }
            ];
            await database.collection('categories').insertMany(defaultCategories);
            console.log('Created categories collection with default data');
        }

        // Admin collection
        if (!collectionNames.includes('admin')) {
            await database.createCollection('admin');
            await database.collection('admin').createIndex({ username: 1 }, { unique: true });

            // Create default admin user (password: admin123)
            const bcrypt = require('bcryptjs');
            const hashedPassword = await bcrypt.hash('admin123', 10);

            await database.collection('admin').insertOne({
                username: 'admin',
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            console.log('Created admin collection with default user (username: admin, password: admin123)');
        }

    } catch (error) {
        console.error('Error initializing collections:', error.message);
    }
}

/**
 * Get database instance
 */
function getDatabase() {
    if (!db) {
        throw new Error('Database not connected. Call connectToDatabase() first.');
    }
    return db;
}

/**
 * Close database connection
 */
async function closeDatabaseConnection() {
    if (client) {
        await client.close();
        db = null;
        client = null;
        console.log('Database connection closed');
    }
}

module.exports = {
    connectToDatabase,
    getDatabase,
    closeDatabaseConnection
};
