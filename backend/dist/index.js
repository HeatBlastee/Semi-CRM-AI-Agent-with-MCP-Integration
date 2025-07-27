"use strict";
const express = require('express');
const dotenv = require('dotenv');
const leadRoutes = require('./routes/leadRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
dotenv.config();
const app = express();
console.log("CORS origin allowed:", process.env.FRONTEND_ORIGIN);
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use('/leads', leadRoutes);
app.use('/auth', authRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
