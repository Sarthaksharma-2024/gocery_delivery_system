import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';

import path from 'path';
import { fileURLToPath } from 'url';

import authMiddleware from './middleware/auth.js';
import userRouter from './routes/userRoute.js';
import itemrouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderrouter from './routes/orderRoute.js';
import chatbotRouter from './routes/chatbotRoute.js';

const app = express();
const port = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
// MIDDLEWARE 
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) {
                callback(null, true);
                return;
            }
            const allowedOrigins = [
                'http://localhost:5173',
                'http://localhost:5174',
                'http://localhost:5175',
                'http://localhost:5176',
                'http://localhost:5177',
            ];
            if (allowedOrigins.includes(origin) || origin.startsWith('http://localhost:517')) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Routes
app.use("/api/user", userRouter)
app.use('/api/cart', authMiddleware, cartRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/items', itemrouter)
app.use('/api/orders', orderrouter)
app.use('/api/chatbot', chatbotRouter)

app.get('/', (req, res) => {
    res.send('API Working');
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
