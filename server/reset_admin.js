const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function resetPassword() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('dnd-portfolio');
        const adminCollection = db.collection('admin');

        const hashedPassword = await bcrypt.hash('admin123', 10);

        // Update or insert admin user
        const result = await adminCollection.updateOne(
            { username: 'admin' },
            {
                $set: {
                    username: 'admin',
                    password: hashedPassword,
                    updatedAt: new Date()
                },
                $setOnInsert: {
                    createdAt: new Date()
                }
            },
            { upsert: true }
        );

        console.log('Admin password reset successfully to: admin123');
        console.log('Matched count:', result.matchedCount);
        console.log('Modified count:', result.modifiedCount);
        console.log('Upserted count:', result.upsertedCount);

    } catch (error) {
        console.error('Error resetting password:', error);
    } finally {
        await client.close();
    }
}

resetPassword();
