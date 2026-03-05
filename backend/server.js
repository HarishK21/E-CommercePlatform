require('dotenv').config();

const express = require('express');
const app = express();

const connectDB = require('./config/database');
const seedDatabase = require('./config/seed');
const setupMiddleware = require('./middleware');

const itemRoutes = require('./routes/items');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');

const PORT = process.env.PORT || 8080;

// Setup middleware
setupMiddleware(app);

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Shoply API is running' });
});

// API Routes
app.use('/api/items', itemRoutes);
app.use('/api', userRoutes);
app.use('/api', orderRoutes);

// 404 Fallback for unknown API routes
app.use('/api', (req, res) => {
    res.status(404).json({ success: false, message: 'API endpoint not found' });
});

// Start server after database connection
const startServer = async () => {
    try {
        const connected = await connectDB();
        if (connected) {
            await seedDatabase();
        } else {
            console.warn('Warning: MongoDB connection failed. Server will start but database operations may fail.');
        }
        
        app.listen(PORT, () => {
            console.log("Server has started on port " + PORT);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();