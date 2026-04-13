import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import User from './models/User.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const ensureAdminUser = async () => {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'password123';

    if (!adminPassword) {
        return;
    }

    let adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
        await User.create({
            name: 'Admin User',
            email: adminEmail,
            password: adminPassword,
            role: 'admin'
        });
        console.log(`Admin user created: ${adminEmail}`);
        return;
    }

    adminUser.name = 'Admin User';
    adminUser.role = 'admin';
    adminUser.password = adminPassword;
    await adminUser.save();
    console.log(`Admin user credentials synced: ${adminEmail}`);
};

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    await ensureAdminUser();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
