const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// ... 其余代码 ... 